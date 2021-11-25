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

export const getAlbum = (state: AppStateType) => state.albumReducer.albumData

export const getAlbumTitle = (state: AppStateType) => state.albumReducer.albumTitle

export const getAlbumImage = (state: AppStateType) => state.albumReducer.albumImage

export const getGenres = (state: AppStateType) => state.genresReducer.genres

export const albumsSearchResponse = (state: AppStateType) => state.searchReducer.albums
export const artistsSearchResponse = (state: AppStateType) => state.searchReducer.artists
export const tracksSearchResponse = (state: AppStateType) => state.searchReducer.tracks

export const searchResponse = albumsSearchResponse || artistsSearchResponse || tracksSearchResponse

export const getArtistsNames = (state: AppStateType) => state.profileReducer.likedArtistNames

export const getLikedAlbums = (state: AppStateType) => state.profileReducer.likedAlbumsNames

export const getLikedTracks = (state: AppStateType) => state.profileReducer.likedTracks