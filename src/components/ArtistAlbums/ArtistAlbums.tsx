import styles from './ArtistAlbums.module.scss'
import { useSelector } from 'react-redux'
import { artistAlbums } from '../../redux/selectors/musicSelectors'
import { MusicAlbumCard } from '../MusicAlbumCard/MusicAlbumCard'
//import { useState, useEffect } from 'react'


export const ArtistAlbums = () => {

    const data = useSelector(artistAlbums)

    return (
        <div className={styles.artist__albums_root}>
            {
                data ?
                data.items.map((album: any) => <MusicAlbumCard 
                                                img={album.images[2].url}
                                                name={album.name}
                                                albumType={album.album_type}
                                                />)
                : <div>Loading...</div>
            }
        </div>
    )
}