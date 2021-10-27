import { AppStateType } from '../root_reducer'
import { createSelector } from 'reselect'
import { AlbumType, AlbumsDataType } from '../../types/music_types'

export const selectNewReleases = (state: AppStateType) => state.musicReducer.newReleasesData

export const selectLoading = (state: AppStateType) => state.musicReducer.isLoading

export const selectArtistData = (state: AppStateType) => state.musicReducer.artistData

const selectArtistAlbums = (state: AppStateType) => state.musicReducer.albumsData

export const getArtistAlbums = createSelector(selectArtistAlbums, (data: AlbumsDataType) => {
    return [...data.items.reduce((map: any, album: AlbumType) => map.set(album.name, album), new Map()).values()]
})