import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    data: null as any,
    error: null as any
}

export type InitialStateType = typeof initialState

const musicReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'music/GET_DATA': {
            return {
                ...state, data: action.data
            }
        }
        case 'music/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'music/GET_ELSE_MUSIC': {
            return {
                ...state, data: [...state.data, ...action.data]
            }
        }
        default: 
            return state
    }

}

export const actions = {
    music: (data: any) => ({type: 'music/GET_DATA', data} as const),
    error: (error: any) => ({type: 'music/CATCH_ERROR', error} as const),
    elseMusic: (data: any) => ({type: 'music/GET_ELSE_MUSIC', data} as const)
}

export const getMusic = (country: string): ThunkType => {
    return async (dispatch) => {
        let albums = await musicAPI.getNewReleases(country)
        try{
            dispatch(actions.music(albums.albums.items))
        } catch {
            dispatch(actions.error('some error'))
        }
    }
}

export const getElseMusic = (country: string, offset: number): ThunkType => {
    return async(dispatch) => {
        let albums = await musicAPI.getElseNewReleases(country, offset)
        try{
            dispatch(actions.elseMusic(albums.albums.items))
        } catch {
            dispatch(actions.error('some error'))
        }
    }
}


export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>