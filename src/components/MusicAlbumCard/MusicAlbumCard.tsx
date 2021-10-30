import styles from './MusicAlbumCard.module.scss'

type PropsType = {
    img: string
    name: string
    albumType: string
    totalTracks?: number
    releaseDate: string
    id: string
}

export const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType, releaseDate, id}) => {
    return (
        <div className={styles.music__album_root}>
           <img src={img} alt="music album"/>
            <div className={styles.music__album_title}>{name}</div>
            { 
                albumType === 'single' ? <div className={styles.music__album_type}>{albumType}</div> : null
            }
            <div className={styles.music__album_date}>{releaseDate}</div>
        </div>
    )
}