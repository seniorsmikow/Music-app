import axios from "axios"
import {ResultCodesEnum} from '../types/auth_types'
import { SocialNetworkCredentials } from '../credentials/credentials'

const credentials = SocialNetworkCredentials()

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": credentials.ApiKey},
})

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}