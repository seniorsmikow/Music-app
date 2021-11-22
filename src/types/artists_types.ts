export type ArtistsType = {
    images: Array<ImagesType>
    genres: Array<string>
    followers: { 
        href?: null | string
        total: number
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    popularity: number
    type: string
    uri: string
}

export type ImagesType = {
    height: number
    url: string
    width: number
}

export type ArtistType = {
    href: string
    id: string
    name: string
    type: string
    uri: string
    external_urls: {
        spotify: string
    }
}