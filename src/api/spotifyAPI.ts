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
        })
    }
    
}

export const musicAPI = {
  getNewReleases(country: string, limit: number) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  },
  getAllCategories() {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/browse/categories`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  },
  search(query: string) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/search?query=${query}&type=artist`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  },
  getArtistData(artistId: string) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  },
  getArtistAlbums(artistId: string) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  }
}