import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { AlbumDataType } from '../types/albums_types'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    error: '',
    isLoading: true,
    albumData: null as AlbumDataType | null,
    albumTitle: '',
    albumImage: ''
}

export type InitialStateType = typeof initialState

const albumReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'album/HANDLE_LOADER': {
            return {
                ...state, isLoading: action.loading
            }
        }
        case 'album/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'album/GET_ALBUM_DATA': {
            return {
                ...state, albumData: action.data
            }
        }
        case 'album/SET_ALBUM_TITLE': {
            return {
                ...state, albumTitle: action.title
            }
        }
        case 'album/SET_ALBUM_IMAGE': {
            return {
                ...state, albumImage: action.image
            }
        }
        default: 
            return state
    }

}

export const actions = {
    handleLoader: (loading: boolean) => ({type: 'album/HANDLE_LOADER', loading} as const),
    catchError: (error: string) => ({type: 'album/CATCH_ERROR', error} as const),
    getAlbum: (data: AlbumDataType) => ({type: 'album/GET_ALBUM_DATA', data} as const),
    setTitle: (title: string) => ({type: 'album/SET_ALBUM_TITLE', title} as const),
    setImage: (image: string) => ({type: 'album/SET_ALBUM_IMAGE', image} as const)
}

export const getAlbumData = (albumId: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.handleLoader(true))
        let data = await musicAPI.getAlbumData(albumId)
        try{
            dispatch(actions.getAlbum(data))
            dispatch(actions.handleLoader(false))
        } catch {
            dispatch(actions.catchError('some error'))
        }
        finally {
            dispatch(actions.handleLoader(false))
        }
    }
}

export const setAlbumTitle= (title: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.handleLoader(true))
        dispatch(actions.setTitle(title))
    }
}

export const setAlbumImage = (image: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.handleLoader(true))
        dispatch(actions.setImage(image))
    }
}

export default albumReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>