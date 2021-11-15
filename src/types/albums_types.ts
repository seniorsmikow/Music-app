export type AlbumDataType = {
    href: string
    limit: number
    next: string
    offset: number
    previous?:null | string
    total: number
    items: Array<AlbumItemType>
}

export type AlbumItemType = {
    disc_number: number
    duration_ms: number
    explicit?: boolean
    href: string
    id: string
    is_local: boolean
    name: string
    preview_url: string
    track_number: number
    type: string
    uri: string
    available_markets: Array<string>
    external_urls: {
        spotify: string
    }
    artists: Array<any>
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