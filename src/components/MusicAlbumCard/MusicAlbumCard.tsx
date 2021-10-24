import styles from './MusicAlbumCard.module.scss'

type PropsType = {
    img: string
    name: string
    albumType: string
}

export const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType}) => {
    return (
        <div className={styles.music__album_root}>
           <img src={img} alt="music album"/>
            {name}
            {albumType}
        </div>
    )
}