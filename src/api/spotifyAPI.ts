import axios from "axios"
import { SpotifyCredentials } from '../credentials/credentials'

const credentials = SpotifyCredentials()

export const musicAPI = {
    getNewReleases() {
        return axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(credentials.ClientId + ':' + credentials.ClientSecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          axios('https://api.spotify.com/v1/albums/5kV0KBXfELibs6qQJLmOtg', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
          })
          .then (data => console.log(data))
        })
    }
}