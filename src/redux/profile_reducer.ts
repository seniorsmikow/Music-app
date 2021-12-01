import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { profileAPI } from '../api/profileAPI'
import { ProfileType } from '../types/profile_types'

export type MusicData = {
    name: string
    id: string
    image?: string
}


let initialState = {
    profile: null as ProfileType | null,
    isLoad: false,
    likedArtistNames: [] as Array<MusicData>,
    likedAlbumsNames: [] as Array<MusicData>,
    likedTracks: [] as Array<MusicData>,
    error: ''
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/GET_PROFILE': {
            return {
                ...state, profile: action.payload
            }
        }
        case 'profile/IS_LOADING': {
            return {
                ...state, isLoad: action.load
            }
        }
        case 'profile/SET_ALBUM_ID': {
            return {
                ...state, likedAlbumsNames: [...state.likedAlbumsNames, action.data]
            }
        }
        case 'profile/SET_ARTIST_ID': {
            return {
                ...state, likedArtistNames: [...state.likedArtistNames, action.data]
            }
        }
        case 'profile/SET_TRACK_ID': {
            return {
                ...state, likedTracks: [...state.likedTracks, action.data]
            }
        }
        case 'profile/DELETE_ARTIST_IN_COLL': {
            return {
                ...state, likedArtistNames: [...state.likedArtistNames.filter(el => el.id !== action.id)]
            }
        }
        case 'profile/DELETE_ALBUM_IN_COLL': {
            return {
                ...state, likedAlbumsNames: [...state.likedAlbumsNames.filter(el => el.id !== action.id)]
            }
        }
        case 'profile/DELETE_TRACK_IN_COLL': {
            return {
                ...state, likedTracks: [...state.likedTracks.filter(el => el.id !== action.id)]
            }
        }
        case 'profile/FETCH_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        default: 
            return state
    }

}

export const actions = {
    getProfile: (payload: ProfileType) => ({type: 'profile/GET_PROFILE', payload} as const),
    loading: (load: boolean) => ({type: 'profile/IS_LOADING', load} as const),
    setArtistsName: (data: MusicData) => ({type: 'profile/SET_ARTIST_ID', data} as const),
    setAlbumsName: (data: MusicData) => ({type: 'profile/SET_ALBUM_ID', data} as const),
    setTrack: (data: MusicData) => ({type: 'profile/SET_TRACK_ID', data} as const),
    deleteAlbum: (id: string) => ({type: 'profile/DELETE_ALBUM_IN_COLL', id} as const),
    deleteArtist: (id: string) => ({type: 'profile/DELETE_ARTIST_IN_COLL', id} as const),
    deleteTrack: (id: string) => ({type: 'profile/DELETE_TRACK_IN_COLL', id} as const),
    fetchError: (error: string) => ({type: 'profile/FETCH_ERROR', error} as const)
}

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.loading(true))
        try {
            let data = await profileAPI.getUserProfile(userId)
            dispatch(actions.getProfile(data))
            dispatch(actions.loading(false))
        } catch (error) {
            dispatch(actions.fetchError('Произошла ошибка'))
        } finally {
            dispatch(actions.loading(false))
        }
        
    }
}

export enum MusicEnum {
    ALBUM = 'album',
    ARTIST = 'artist',
    TRACK = 'track'
}

export const setIdOfLikedMusic = (data: MusicData, type: MusicEnum): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.loading(true))
        if (type === MusicEnum.ARTIST) {
            dispatch(actions.setArtistsName(data))
        } else if (type === MusicEnum.ALBUM) {
            dispatch(actions.setAlbumsName(data))
        } else if (type === MusicEnum.TRACK) {
            dispatch(actions.setTrack(data))
        }
        dispatch(actions.loading(false))
    }
}

export enum DELETE_MUSIC_ENUM {
    ALBUM = 'album',
    ARTIST = 'artist',
    TRACK = 'track'
}

export const deleteMusicInCollection = (id: string, type: DELETE_MUSIC_ENUM): ThunkType => {
    return async(dispatch) => {
        if(type === DELETE_MUSIC_ENUM.ARTIST) {
            dispatch(actions.deleteArtist(id))
        } else if(type === DELETE_MUSIC_ENUM.ALBUM) {
            dispatch(actions.deleteAlbum(id))
        } else if(type === DELETE_MUSIC_ENUM.TRACK) {
            dispatch(actions.deleteTrack(id))
        }
        
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>