import { instance, APIResponseType, ResultCodeForCapcthaEnum } from './api'
import { LoginResponseType, ResultCodesEnum, AuthMe } from '../types/auth_types'


export const authAPI = {
    me() {
        return instance.get<APIResponseType<AuthMe>>(`auth/me`).then(res => res.data)
    },
    login(email: string | null, password: string | null, rememberMe: null | boolean = false, captcha: string | null) {
        debugger
        return instance.post<APIResponseType<LoginResponseType, ResultCodeForCapcthaEnum | ResultCodesEnum>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}