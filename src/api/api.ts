import axios from "axios"
import {ResultCodesEnum} from '../types/auth_types'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "be25bc47-78e9-4634-b668-90794e8b62b9"},
})

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}