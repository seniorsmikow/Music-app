import { instance } from "./api"
import {getUserProfile} from '../types/profile_types'

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<getUserProfile>(`/profile/${userId}`).then(res => res.data)
    }
}