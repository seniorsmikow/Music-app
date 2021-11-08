import { AppStateType } from '../root_reducer'
import { createSelector } from 'reselect'
import { AlbumType } from '../../types/music_types'

export const fetchNewReleases = (state: AppStateType) => state.musicReducer.newReleasesData

export const getLoading = (state: AppStateType) => state.musicReducer.isLoading

export const fetchArtistData = (state: AppStateType) => state.musicReducer.artistData

const getArtistAlbums = (state: AppStateType) => state.musicReducer.albumsData

export const getAlbums = createSelector(
    getArtistAlbums, 
    (items: Array<AlbumType>) => [...items.reduce((map: any, album: AlbumType) => map.set(album.name, album), new Map()).values()]
)

export const getAlbum = (state: AppStateType) => state.artistReducer.albumData

export const getAlbumId = (state: AppStateType) => state.artistReducer.albumId

export const getActive = (state: AppStateType) => state.artistReducer.isActive