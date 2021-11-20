import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    error: '',
    isLoading: true,
    albums: null as Array<any> | null,
    artists: null as Array<any> | null,
    tracks: null as Array<any> | null

}

export type InitialStateType = typeof initialState

const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'search/HANDLE_LOADER': {
            return {
                ...state, isLoading: action.loading
            }
        }
        case 'search/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'search/GET_ALBUMS_RESPONSE': {
            return {
                ...state, albums: action.response
            }
        }
        case 'search/GET_ARTISTS_RESPONSE': {
            return {
                ...state, artists: action.response
            }
        }
        case 'search/GET_TRACKS_RESPONSE': {
            return {
                ...state, tracks: action.response
            }
        }
        default: 
            return state
    }

}

export const actions = {
    handleLoader: (loading: boolean) => ({type: 'search/HANDLE_LOADER', loading} as const),
    catchError: (error: string) => ({type: 'search/CATCH_ERROR', error} as const),
    getArtists: (response: any) => ({type: 'search/GET_ARTISTS_RESPONSE', response} as const),
    getAlbums: (response: any) => ({type: 'search/GET_ALBUMS_RESPONSE', response} as const),
    getTracks: (response: any) => ({type: 'search/GET_TRACKS_RESPONSE', response} as const),
}

export const getMusicSearchResponse = (query: string, type: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.handleLoader(true))
        let data = await musicAPI.search(query, type)
        try{
            if (data.albums) {
                dispatch(actions.getAlbums(data.albums.items))
            } else if (data.artists) {
                dispatch(actions.getArtists(data.artists.items))
            } else if (data.tracks) {
                dispatch(actions.getTracks(data.tracks.items))
            }
        } catch {
            dispatch(actions.catchError('some error'))
        }
        finally {
            dispatch(actions.handleLoader(false))
        }
    }
}

export default searchReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>