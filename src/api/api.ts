import axios from "axios"
import {ResultCodesEnum} from '../types/auth_types'
import { SocialNetworkCredentials, SpotifyCredentials } from '../credentials/credentials'

const credentials = SocialNetworkCredentials()
const spotifyCredentials = SpotifyCredentials()

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": credentials.ApiKey},
})

export const musicInstance = axios.create({
    baseURL: spotifyCredentials.baseURL
})

const spotifyInterceptor = (config: any) => { // TODO learn what is config!!!
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

musicInstance.interceptors.request.use(spotifyInterceptor)

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}