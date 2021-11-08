import styles from './MusicAlbumCard.module.scss'
import { AlbumInfo } from '../AlbumInfo/AlbumInfo'
import { useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbum, getActive } from '../../redux/selectors/musicSelectors'
import { getAlbumData, handleActiveElement } from '../../redux/artist_reducer'

type PropsType = {
    img: string
    name: string
    albumType: string
    totalTracks?: number
    releaseDate: string
    id: string
}

export const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType, releaseDate, id}) => {

    const active = useSelector(getActive)
    const[activeEl, setActiveEl] = useState(active)
    const dispatch = useDispatch()
    const album = useSelector(getAlbum)

    const handleActive = () => {
        dispatch(handleActiveElement(true))
        setActiveEl(true)
        dispatch(getAlbumData(id))
    }

    return (
        <div className={styles.music__album_root} onClick={() => handleActive()}>
            <div className={styles.music__album_info}>
                <img src={img} alt="music album"/>
                <div className={styles.music__album_title}>{name}</div>
                { 
                    albumType === 'single' ? <div className={styles.music__album_type}>{albumType}</div> : null
                }
                <div className={styles.music__album_date}>{releaseDate}</div>
            </div>
            <div className = {cn(styles.visible, activeEl ? styles.visible_active : '')}>
                {
                    album ? <AlbumInfo 
                                items={album.items}
                            />
                            : "Loading..."
                }
                
            </div>
        </div>
    )
}