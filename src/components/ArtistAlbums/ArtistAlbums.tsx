import styles from './ArtistAlbums.module.scss'
import { useSelector } from 'react-redux'
import { getAlbums } from '../../redux/selectors/musicSelectors'
import { MusicAlbumCard } from '../MusicAlbumCard/MusicAlbumCard'
import { AlbumType } from '../../types/music_types'


export const ArtistAlbums = () => {
    
    let albums = useSelector(getAlbums)
    
    return (
        <div className={styles.artist__albums_root}>
            <h1>Дискография</h1>
            {
                albums ?
                <div>
                    {
                        albums.map((album: AlbumType) => <MusicAlbumCard 
                                                            img={album.images[2].url}
                                                            name={album.name}
                                                            albumType={album.album_type}
                                                            releaseDate={album.release_date}
                                                            key={album.id}
                                                            id={album.id}
                        />)
                    }
                </div>
                : <div>Loading...</div>
            }
        </div>
    )
}