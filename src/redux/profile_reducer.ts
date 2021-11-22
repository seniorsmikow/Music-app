import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { profileAPI } from '../api/profileAPI'
import { profileType } from '../types/profile_types'

export type MusicData = {
    name: string
    id: string
    image?: string
}


let initialState = {
    profile: null as profileType | null,
    isLoad: false,
    likedArtistNames: [] as Array<MusicData>,
    likedAlbumsNames: [] as Array<MusicData>,
    likedTracks: [] as Array<MusicData>,
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
        default: 
            return state
    }

}

export const actions = {
    getProfile: (payload: any) => ({type: 'profile/GET_PROFILE', payload} as const),
    loading: (load: boolean) => ({type: 'profile/IS_LOADING', load} as const),
    setArtistsName: (data: MusicData) => ({type: 'profile/SET_ARTIST_ID', data} as const),
    setAlbumsName: (data: MusicData) => ({type: 'profile/SET_ALBUM_ID', data} as const),
    setTrack: (data: MusicData) => ({type: 'profile/SET_TRACK_ID', data} as const),
}

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.loading(true))
        let data = await profileAPI.getUserProfile(userId)
        dispatch(actions.getProfile(data))
        dispatch(actions.loading(false))
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

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>