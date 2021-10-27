export type ArtistsNamesType = {
    externals_urls: {spotify: string}
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export type ImagesType = {
    height: number
    url: string
    width: number
}

export type ExternalUrlType = {
    spotify: string
    href?: string
}

export type AlbumArtistType = {
    href:string
    id: string
    name: string
    type: string
    uri: string
    external_urls: ExternalUrlType
}

export type AlbumType = {
    album_group: string 
    album_type: string
    href: string
    id: string
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
    images: Array<ImagesType>
    external_urls: ExternalUrlType
    artists: Array<AlbumArtistType>
}

export type AlbumsDataType = {
    href: string
    limit: number
    next: string
    offset: number
    previous: string | null
    total: number
    items: Array<AlbumType>
}

export type NewReleasesDataType = {
    album_type: string
    href: string
    id: string
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
    artists: Array<ArtistsNamesType>
    images: Array<ImagesType>
    external_urls: ExternalUrlType
}

export type ArtistDataType = {
    href: string
    id: string
    name: string
    popularity: number
    type: string
    uri: string
    images: Array<ImagesType>
    genres: Array<string>
    external_urls: {
        spotify: string
    }
    followers: {
        href: null | string
        total: number
    }
}