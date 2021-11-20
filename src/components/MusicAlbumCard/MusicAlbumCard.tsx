import React from "react"
import styles from './MusicAlbumCard.module.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setAlbumTitle, setAlbumImage } from '../../redux/album_reducer'

type PropsType = {
    img?: string
    name: string
    albumType?: string
    totalTracks?: number
    releaseDate?: string
    id: string
    albumImg: string
}

export  const MusicAlbumCard: React.FC<PropsType> = React.memo(({img, name, albumType, releaseDate, id, albumImg}) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const showAlbum = (albumId: string) => {
        dispatch(setAlbumTitle(name))
        dispatch(setAlbumImage(albumImg))
        history.push(`/musicAlbum/${albumId}`)
    }

    return (
        <div className={styles.album__card_root} onClick={() => showAlbum(id)}>
            <div className={styles.album__card_image}>
                <img src={img} alt="icon"/>
            </div>
            <div className={styles.album__card_title}>{name}</div>
            <div>{albumType}</div>
            <div>{releaseDate}</div>
        </div>
    )
})