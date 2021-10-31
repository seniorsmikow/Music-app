import styles from './MusicAlbumCard.module.scss'
import { useDispatch } from 'react-redux'
import { getAlbumData } from '../../redux/music_reducer'
import { AlbumInfo } from '../AlbumInfo/AlbumInfo'
import { useState, useEffect } from 'react'

type PropsType = {
    img: string
    name: string
    albumType: string
    totalTracks?: number
    releaseDate: string
    id: string
}

export const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType, releaseDate, id}) => {

    const dispatch = useDispatch()
    const[visible, setVisible] = useState(false)

    // useEffect(() => {
    //     setVisible(true)
    // }, [])

    const getAlbum = (albumId: string) => {
        setVisible(!visible)
        dispatch(getAlbumData(albumId))
    }

    return (
        <div className={styles.music__album_root} onClick={() => getAlbum(id)}>
           <img src={img} alt="music album"/>
            <div className={styles.music__album_title}>{name}</div>
            { 
                albumType === 'single' ? <div className={styles.music__album_type}>{albumType}</div> : null
            }
            <div className={styles.music__album_date}>{releaseDate}</div>
            <AlbumInfo visible={visible}/>
        </div>
    )
}