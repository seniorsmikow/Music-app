import styles from './ArtistAlbums.module.scss'
import { useSelector } from 'react-redux'
import { artistAlbums } from '../../redux/selectors/musicSelectors'
//import { useState, useEffect } from 'react'


export const ArtistAlbums = () => {

    const data = useSelector(artistAlbums)

    return (
        <div className={styles.artist__albums_root}>
            {
                data ?
                data.items.map((album: any) => <img src={album.images[2].url} alt="album" key={album.id}/>)
                : <div>Loading...</div>
            }
        </div>
    )
}