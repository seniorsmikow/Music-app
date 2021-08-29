import { instance } from './api'
import {UsersType} from '../types/users_types'


export const usersAPI = {
    getAllUsers() {
        return instance.get<UsersType>('/users')
    }
}