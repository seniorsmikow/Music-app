import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { authAPI } from '../api/authAPI'
import { AuthType, ResultCodesEnum } from '../types/auth_types'

let initialState = {
    userId: null as number | null,
    messages: [],
    resultCode: 0,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
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
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe)
        dispatch(actions.loginAction(response.data))
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
        }
    }
}

export default appReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>