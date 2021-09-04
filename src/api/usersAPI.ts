import { instance } from './api'
import {GetItemsType} from '../types/users_types'


export const usersAPI = {
    getAllUsers(count: number, page: number) {
        return instance.get<GetItemsType>(`/users?count=${count}&page=${page}`).then(res => res.data)
    }
}