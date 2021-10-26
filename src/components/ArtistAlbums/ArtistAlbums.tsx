import styles from './ArtistAlbums.module.scss'
import { useSelector } from 'react-redux'
import { artistAlbums } from '../../redux/selectors/musicSelectors'
import { MusicAlbumCard } from '../MusicAlbumCard/MusicAlbumCard'
import { AlbumType } from '../../types/music_types'
import { useState, useEffect } from 'react'


export const ArtistAlbums = () => {

    let data = useSelector(artistAlbums)
    const [albums, setAlbums] = useState<Array<AlbumType>>()

    useEffect(() => {
        if(data) {
            let sortData = [...data.items.reduce((map: any, album: AlbumType) => map.set(album.name, album), new Map()).values()]
            setAlbums(sortData)
        }
    }, [data])

    return (
        <div className={styles.artist__albums_root}>
            <h1>Дискография</h1>
            {
                albums ?
                albums.map((album: AlbumType) => <MusicAlbumCard 
                                                img={album.images[2].url}
                                                name={album.name}
                                                albumType={album.album_type}
                                                releaseDate={album.release_date}
                                                key={album.id}
                                                />)
                : <div>Loading...</div>
            }
        </div>
    )
}