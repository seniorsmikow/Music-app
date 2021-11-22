import { ArtistType } from './artists_types'
import { AlbumsSearchType } from './albums_types'

export type TracksType = {
    disc_number: number
    duration_ms: number
    explicit: boolean
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    external_urls: {
        spotify: string
    }
    external_ids: {
        isrc: string
    }
    available_markets: Array<string>
    artists: Array<ArtistType>
    album: AlbumsSearchType
}