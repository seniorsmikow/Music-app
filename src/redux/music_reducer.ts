import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    data: null as any,
    error: null as any,
    categories: null as any,
    queryResponse: null as any
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
        case 'music/GET_CATEGORIES': {
            return {
                ...state, categories: action.data
            }
        }
        case 'music/SEARCH': {
            return {
                ...state, queryResponse: action.data
            }
        }
        default: 
            return state
    }

}

export const actions = {
    music: (data: any) => ({type: 'music/GET_DATA', data} as const),
    error: (error: any) => ({type: 'music/CATCH_ERROR', error} as const),
    categories: (data: any) => ({type: 'music/GET_CATEGORIES', data} as const),
    search: (data: any) => ({type: 'music/SEARCH', data} as const)
}

export const getMusic = (country: string, limit: number): ThunkType => {
    return async (dispatch) => {
        let albums = await musicAPI.getNewReleases(country, limit)
        try{
            dispatch(actions.music(albums.albums.items))
        } catch {
            dispatch(actions.error('some error'))
        }
    }
}

export const getCategories = (): ThunkType => {
    return async (dispatch) => {
        let categories = await musicAPI.getAllCategories()
        try{
            dispatch(actions.categories(categories.categories.items))
        } catch {
            dispatch(actions.error('some error'))
        }
    }
}

export const search = (query: string): ThunkType => {
    return async (dispatch) => {
        let response = await musicAPI.search(query)
        try{
            dispatch(actions.search(response.artists.items))
        } catch {
            dispatch(actions.error('some error'))
        }
    }
}


export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>