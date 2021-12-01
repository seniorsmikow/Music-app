export type UserProfileType = {
    userId: number
}

export type ProfileType = {
    photos: profilePhotosType 
    contacts: contactsProfileType 
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    aboutMe: string | null
}

export type profilePhotosType = {
    small: string | null
    large: string | null
}

export type contactsProfileType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}