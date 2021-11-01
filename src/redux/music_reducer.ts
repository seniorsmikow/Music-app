import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { musicAPI } from '../api/spotifyAPI'
import { NewReleasesDataType, ArtistDataType, AlbumType } from '../types/music_types'

let initialState = {
    newReleasesData: [] as Array<NewReleasesDataType>,
    error: '' as string,
    categories: null as any,
    queryResponse: null as any,
    isLoading: true,
    artistData: null as any,
    albumsData: [] as Array<AlbumType>,
    albumData: null as any
}

export type InitialStateType = typeof initialState

const musicReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'music/GET_NEW_RELEASES': {
            return {
                ...state, newReleasesData: action.releases
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
        case 'music/LOAD_DATA': {
            return {
                ...state, isLoading: action.load
            }
        }
        case 'music/GET_ARTIST': {
            return {
                ...state, artistData: action.data
            }
        }
        case 'music/GET_ARTIST_ALBUMS': {
            return {
                ...state, albumsData: action.data
            }
        }
        case 'music/GET_ALBUM_DATA': {
            return {
                ...state, albumData: action.data
            }
        }
        default: 
            return state
    }

}

export const actions = {
    getReleases: (releases: Array<NewReleasesDataType>) => ({type: 'music/GET_NEW_RELEASES', releases} as const),
    error: (error: any) => ({type: 'music/CATCH_ERROR', error} as const),
    categories: (data: any) => ({type: 'music/GET_CATEGORIES', data} as const),
    search: (data: any) => ({type: 'music/SEARCH', data} as const),
    loader: (load: boolean) => ({type: 'music/LOAD_DATA', load} as const),
    getArtistInfo: (data: ArtistDataType) => ({type: 'music/GET_ARTIST', data} as const),
    getAlbums: (data: Array<AlbumType>) => ({type: 'music/GET_ARTIST_ALBUMS', data} as const),
    getAlbum: (data: any) => ({type: 'music/GET_ALBUM_DATA', data} as const)
}

export const getNewReleases = (country: string, limit: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.loader(true))
        let albums = await musicAPI.getNewReleases(country, limit)
        try{
            dispatch(actions.getReleases(albums.items))
            dispatch(actions.loader(false))
        } catch {
            dispatch(actions.error('some error'))
        }
        finally {
            dispatch(actions.loader(false))
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

export const getArtistData = (artistId: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.loader(true))
        let data = await musicAPI.getArtistData(artistId)
        try{
            dispatch(actions.getArtistInfo(data))
            dispatch(actions.loader(false))
        } catch {
            dispatch(actions.error('some error'))
        }
        finally {
            dispatch(actions.loader(false))
        }
    }
}

export const getArtistAlbums = (artistId: string, offset: number, limit: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.loader(true))
        let data = await musicAPI.getArtistAlbums(artistId, offset, limit)
        try{
            dispatch(actions.getAlbums(data.items))
            dispatch(actions.loader(false))
        } catch {
            dispatch(actions.error('some error'))
        }
        finally {
            dispatch(actions.loader(false))
        }
    }
}

export const getAlbumData = (albumId: string): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.loader(true))
        let data = await musicAPI.getAlbumData(albumId)
        try{
            dispatch(actions.getAlbum(data))
            dispatch(actions.loader(false))
        } catch {
            dispatch(actions.error('some error'))
        }
        finally {
            dispatch(actions.loader(false))
        }
    }
}

export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>