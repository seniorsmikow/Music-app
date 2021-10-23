import axios from "axios"
import { SpotifyCredentials } from '../credentials/credentials'

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
      }).then(token => localStorage.setItem('spotifyToken', token.data.access_token))
  }
}

const axiosHeaders = {
  headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('spotifyToken')}
}

export const musicAPI = {
  getNewReleases(country: string, limit: number) {
        return axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}`, axiosHeaders).then(res => res.data)
  },
  getAllCategories() {
    return axios.get(`https://api.spotify.com/v1/browse/categories`, axiosHeaders).then(res => res.data)
  },
  search(query: string) {
    return axios.get(`https://api.spotify.com/v1/search?query=${query}&type=artist`, axiosHeaders).then(res => res.data)
  },
  getArtistData(artistId: string) {
    return axios.get(`https://api.spotify.com/v1/artists/${artistId}`, axiosHeaders).then(res => res.data)
  },
  getArtistAlbums(artistId: string) {
    return axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, axiosHeaders).then(res => res.data)
  }
}