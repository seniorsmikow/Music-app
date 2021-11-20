import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    error: '',
    isLoading: true,
    genres: null as Array<string> | null
}

export type InitialStateType = typeof initialState

const genresReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'genres/HANDLE_LOADER': {
            return {
                ...state, isLoading: action.loading
            }
        }
        case 'genres/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'genres/GET_GENRES': {
            return {
                ...state, genres: action.genres
            }
        }
        default: 
            return state
    }

}

export const actions = {
    handleLoader: (loading: boolean) => ({type: 'genres/HANDLE_LOADER', loading} as const),
    catchError: (error: string) => ({type: 'genres/CATCH_ERROR', error} as const),
    getGenres: (genres: Array<string>) => ({type: 'genres/GET_GENRES', genres} as const)
}

export const getMusicGenres = (): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.handleLoader(true))
        let data = await musicAPI.getGenres()
        try{
           dispatch(actions.getGenres(data.genres))
        } catch {
            dispatch(actions.catchError('some error'))
        }
        finally {
            dispatch(actions.handleLoader(false))
        }
    }
}

export default genresReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>