import { instance } from './api'
import {GetUsersItemsType} from '../types/users_types'


export const usersAPI = {
    getAllUsers(count: number, page: number, term: string) {
        return instance.get<GetUsersItemsType>(`/users?count=${count}&page=${page}&term=${term}`).then(res => res.data)
    },
    findUsers(term: string) {
        return instance.get<GetUsersItemsType>(`users?term=${term}&count=${100}`).then(res => res.data)
    }
}