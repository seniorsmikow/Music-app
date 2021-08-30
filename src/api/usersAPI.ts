import { instance } from './api'
import {GetItemsType} from '../types/users_types'


export const usersAPI = {
    getAllUsers(count: number, page = 1) {
        return instance.get<GetItemsType>(`/users?${count}&${page}`).then(res => res.data)
    }
}