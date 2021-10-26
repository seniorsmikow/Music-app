export type ArtistsNamesType = {
    externals_urls: {spotify: string}
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export type AlbumImagesType = {
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
    images: Array<AlbumImagesType>
    external_urls: ExternalUrlType
    artists: Array<AlbumArtistType>
}