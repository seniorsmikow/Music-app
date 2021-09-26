import { instance, APIResponseType } from './api'
import {GetUsersItemsType} from '../types/users_types'


export const usersAPI = {
    getAllUsers(count: number, page: number, term: string = '', friend: boolean | '') {
        debugger
        return instance.get<GetUsersItemsType>(`/users?count=${count}&page=${page}&term=${term}&friend=${friend}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    getFriend(userId: number) {
        return instance.get<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}