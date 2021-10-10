import styles from './MusicCardAlbum.module.scss'

type PropsType = {
    album_type: string,
    name: string,
    release_date: string,
    total_tracks: number,
    image: string,
    artistName: string,
    artistId: string
}


export const MusicAlbumCard: React.FC<PropsType> = ({album_type, name, release_date, total_tracks, image, artistName, artistId}) => {
    return (
        <div className={styles.album__card_root}>
            <div>{album_type}</div>
            <div>Название релиза: {name}</div>
            <div>Имя артиста: {artistName}</div>
            <div>Дата релиза: {release_date}</div>
            <div>Количество треков: {total_tracks}</div>
            <div className={styles.album__image}>
                <img src={image} alt={name}/>
            </div>
        </div>
    )
}