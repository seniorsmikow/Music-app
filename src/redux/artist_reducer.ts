import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { AlbumType, AlbumsDataType } from '../types/music_types'
import { musicAPI } from '../api/spotifyAPI'

let initialState = {
    error: '' as string,
    isLoading: true,
    isActive: false,
    artistData: null as any,
    albumsData: [] as Array<AlbumType>,
    albumData: null as any,
    albumId: null as string | null
}

export type InitialStateType = typeof initialState

const musicReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'artist/GET_ALBUM_ID': {
            return {
                ...state, albumId: action.albumId
            }
        }
        case 'artist/HANDLE_LOADER': {
            return {
                ...state, isLoading: action.loading
            }
        }
        case 'artist/CATCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'artist/GET_ALBUM_DATA': {
            return {
                ...state, albumData: action.data
            }
        }
        case 'artist/CHANGE_ACTIVE': {
            return {
                ...state, isActive: action.active
            }
        }
        default: 
            return state
    }

}

export const actions = {
    setAlbumId: (albumId: string) => ({type: 'artist/GET_ALBUM_ID', albumId} as const),
    handleLoader: (loading: boolean) => ({type: 'artist/HANDLE_LOADER', loading} as const),
    catchError: (error: string) => ({type: 'artist/CATCH_ERROR', error} as const),
    getAlbum: (data: AlbumsDataType) => ({type: 'artist/GET_ALBUM_DATA', data} as const),
    changeActive: (active: boolean) => ({type: 'artist/CHANGE_ACTIVE', active} as const)
}

export const setArtistAlbumId = (albumId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setAlbumId(albumId))
    }
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

export const handleActiveElement = (active: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeActive(active))
    }
}


export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>