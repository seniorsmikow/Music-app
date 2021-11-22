import { ArtistType, ImagesType } from './artists_types'

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
    artists: Array<ArtistType>
}

export type AlbumsSearchType = {
    album_type: string
    href: string
    id: string
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
    external_urls: {
        spotify: string
    }
    available_markets: Array<string>
    images: Array<ImagesType>
    artists: Array<ArtistType>
}