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
  getNewReleases(country: string) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=2`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  },
  getElseNewReleases(country: string, offset: number ) {
    return musicTokenAPI.getToken().then(token => {
      return axios(`https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=2&offset=${offset}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token.data.access_token}
          }).then(res => res.data)
    })
  }
}