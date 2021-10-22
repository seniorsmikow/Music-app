import { AppStateType } from '../root_reducer'

export const getReleases = (state: AppStateType) => state.musicReducer.newReleasesData

export const handlerLoading = (state: AppStateType) => state.musicReducer.isLoading

export const getArtist = (state: AppStateType) => state.musicReducer.artistData

export const artistAlbums = (state: AppStateType) => state.musicReducer.albumsData