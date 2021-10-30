import { AppStateType } from '../root_reducer'
import { createSelector } from 'reselect'
import { AlbumType } from '../../types/music_types'

export const fetchNewReleases = (state: AppStateType) => state.musicReducer.newReleasesData

export const getLoading = (state: AppStateType) => state.musicReducer.isLoading

export const fetchArtistData = (state: AppStateType) => state.musicReducer.artistData

const getAlbums = (state: AppStateType) => state.musicReducer.albumsData

export const getArtistAlbums = createSelector(
    getAlbums, 
    (items: Array<AlbumType>) => [...items.reduce((map: any, album: AlbumType) => map.set(album.name, album), new Map()).values()]
)