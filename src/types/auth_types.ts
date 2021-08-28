export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

export type AuthMe = {
    id: number
    email: string
    login: string
}

export type AuthType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}

export type LoginResponseType = {
    userId: number
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export type UserType = {
    userId: number | null, 
    login: string | null, 
    email: string | null,
    isAuth: boolean
}