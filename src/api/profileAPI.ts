import { instance } from "./api"
import { ProfileType } from '../types/profile_types'

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`/profile/${userId}`).then(res => res.data)
    },
    putProfilePhoto(image: any) {
        return instance.put('/profile/photo', image)
    },

}