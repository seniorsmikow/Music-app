import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { authAPI, securityAPI } from '../api/authAPI'
import { AuthType, ResultCodesEnum } from '../types/auth_types'
import { musicTokenAPI } from '../api/spotifyAPI'

let initialState = {
    userId: null as number | null,
    messages: [] as Array<string>,
    resultCode: 0,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    error: null as string | null,
    registrationMessage: null as string | null, // регистрация в API пока не предусмотрена, вызывается alert с оповещением
    captcha: null as string | null,
    isSpotifyAuth: false
}
export type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/USER_LOGIN': {
            return {
                ...state, userId: action.payload.data.userId, isAuth: true
                
            }
        }
        case 'auth/GET_USER': {
            return {
                ...state, userId: action.payload.userId, email: action.payload.email, 
                login: action.payload.login, isAuth: action.payload.isAuth
            }
        }
        case 'auth/USER_LOGOUT': {
            return {
                ...state, userId: action.payload.userId, email: action.payload.email, 
                login: action.payload.login, isAuth: action.payload.isAuth,
            }
        }
        case 'auth/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'auth/REGISTRATION': 
            return {
                ...state, registrationMessage: action.message
            }
        case 'auth/GET_CAPTCHA': 
            return {
                ...state, captcha: action.captcha
            }
        case 'auth/GET_SPOTIFY_TOKEN':
            return {
                ...state, isSpotifyAuth: action.auth
            }
        default: 
            return state
    }

}

export const actions = {
    loginAction: (payload: AuthType) => ({type: 'auth/USER_LOGIN', payload} as const),
    getUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({type: 'auth/GET_USER', 
    payload: {
        userId, login, email, isAuth
    }} as const),
    logoutAction: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({type: 'auth/USER_LOGOUT',
    payload: {
        userId, login, email, isAuth
    }} as const),
    catchError: (error: string | null) => ({type: 'auth/CATCH_ERROR', error} as const),
    registration: (message: string | null) => ({type: 'auth/REGISTRATION', message} as const),
    captcha: (captcha: string | null) => ({type: 'auth/GET_CAPTCHA', captcha} as const),
    spotifyToken: (auth: boolean) => ({type: 'auth/GET_SPOTIFY_TOKEN', auth} as const)
}

export const loginOrRegistration = (email: string, password: string, rememberMe: boolean, formType: string, captcha: string | null): ThunkType => {
    return async (dispatch) => {

        if(formType === 'login') {

            let response = await authAPI.login(email, password, rememberMe, captcha)
            await musicTokenAPI.getToken()

            if(response.data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.loginAction(response.data))
                dispatch(actions.spotifyToken(true))
            } else if(response.data.resultCode === ResultCodesEnum.Captcha) {
                dispatch(getCaptcha())
            } else if(response.data.resultCode === ResultCodesEnum.Error) {
                dispatch(actions.catchError('Неверный Email или Password'))
            } else {
                dispatch(actions.catchError('Неизвестная ошибка'))
            }

        } else {

            //В SamuraiJS Social Network API пока не предусмотрена регистрация пользователей. Вызывается alert
            // с информацией, что пока регистрация не возможна. 
            
            dispatch(actions.registration(`API, на базе которого создан сайт, пока не предоставляет возможность для регистрации пользователей`))
        }
            
        
    }
}

export const getCaptcha = (): ThunkType => {
    return async(dispatch) => {
        let response = await securityAPI.getCaptcha()
        dispatch(actions.captcha(response.data.url))
    }
}

export const getOwnUserData = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if(response.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = response.data
            dispatch(actions.getUserData(id, login, email, true))
        }
    }
}

export const logout = (): ThunkType => {
    return async(dispatch) => {
        let response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(actions.logoutAction(null, null, null, false))
            dispatch(actions.registration(null))
        }
    }
}

export default appReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>