import styles from './MusicAlbumCard.module.scss'
import { AlbumInfo } from '../AlbumInfo/AlbumInfo'
import { useState, useEffect } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setArtistAlbumId } from '../../redux/artist_reducer'
import { getAlbumId } from '../../redux/selectors/musicSelectors'
import { getAlbumData } from '../../redux/artist_reducer'

type PropsType = {
    img: string
    name: string
    albumType: string
    totalTracks?: number
    releaseDate: string
    id: string
}

export const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType, releaseDate, id}) => {

    const[active] = useState(false)
    const dispatch = useDispatch()
    const albumId = useSelector(getAlbumId)

    const handleAlbumId = () => {
        dispatch(setArtistAlbumId(id))
    }

    useEffect(() => {
        if(albumId) {
            dispatch(getAlbumData(albumId))
        }
    })

    return (
        <div className={styles.music__album_root} onClick={() => handleAlbumId()}>
            <div className={styles.music__album_info}>
                <img src={img} alt="music album"/>
                <div className={styles.music__album_title}>{name}</div>
                { 
                    albumType === 'single' ? <div className={styles.music__album_type}>{albumType}</div> : null
                }
                <div className={styles.music__album_date}>{releaseDate}</div>
            </div>
            <div className = {cn(styles.visible, active ? styles.visible_active : '')}>
                <AlbumInfo />
            </div>
        </div>
    )
}