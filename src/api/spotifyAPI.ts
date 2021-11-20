import axios from 'axios'
import { SpotifyCredentials } from '../credentials/credentials'
import { ArtistDataType, AlbumsDataType } from '../types/music_types'
import { AxiosRequestConfig } from 'axios'

const credentials = SpotifyCredentials()

export const musicTokenAPI = {
  getToken() {
      return axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(credentials.ClientId + ':' + credentials.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      }).then(token => token.data.access_token).then(token => localStorage.setItem('spotifyToken', token))
  }
}

const authInterceptor = (config: AxiosRequestConfig) => { 
  config.headers.authorization = `Bearer ${localStorage.getItem('spotifyToken')}`
  return config
}

const $authHost = axios.create()

$authHost.interceptors.request.use(authInterceptor)

export const musicAPI = {
  getNewReleases(country: string, limit: number) {
    return $authHost.get(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}`).then(res => res.data.albums)
  },
  getAllCategories() {
    return $authHost.get(`https://api.spotify.com/v1/browse/categories`).then(res => res.data)
  },
  search(query: string, type: string ) {
    return $authHost.get(`https://api.spotify.com/v1/search?query=${query}&type=${type}`).then(res => res.data)
  },
  getArtistData(artistId: string) {
    return $authHost.get<ArtistDataType>(`https://api.spotify.com/v1/artists/${artistId}`).then(res => res.data)
  },
  getArtistAlbums(artistId: string, offset: number = 5, limit: number = 50) {
    return $authHost.get<AlbumsDataType>(`https://api.spotify.com/v1/artists/${artistId}/albums?offset=${offset}&limit=${limit}`).then(res => res.data)
  },
  getAlbumData(albumId: string) {
    return $authHost.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`).then(res => res.data)
  },
  getGenres() {
    return $authHost.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`).then(res => res.data)
  }
}