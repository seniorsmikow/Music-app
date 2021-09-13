export type UsersType = {
    count: number
    page: number
    term: string
    friend: boolean
}

export type UserType = {
    id: number
    name: string
    photos: UserPhotosType
    status: string | null
    uniqueUrlName: string | null
    followed: boolean
}

export type UserPhotosType = {
    small: string | null
    large: string | null
}

export type GetUsersItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}