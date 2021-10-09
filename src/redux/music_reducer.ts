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
        default: 
            return state
    }

}

export const actions = {
    music: (data: any) => ({type: 'music/GET_DATA', data} as const),
    error: (error: any) => ({type: 'music/CATCH_ERROR', error} as const)
}

export const getMusic = (): ThunkType => {
    return async (dispatch) => {
        let albums = await musicAPI.getNewReleases()
        try{
            dispatch(actions.music(albums))
            console.log(`albums - ${albums}`)
        } catch {
            dispatch(actions.error('some error'))
            console.log('some error')
        }
    }
}


export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>