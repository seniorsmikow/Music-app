import styles from './MusicFindPage.module.scss'
import { useSelector } from 'react-redux'
import { albumsSearchResponse, artistsSearchResponse, tracksSearchResponse } from '../../redux/selectors/musicSelectors'
//import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'
import { ArtistsType } from '../../types/artists_types'
import { AlbumsSearchType } from '../../types/albums_types'
import { TracksType } from '../../types/tracks_types'
import AlbumIcon from '../../img/album.jpg'


export const MusicFindPage = () => {

    const albums = useSelector(albumsSearchResponse)
    const artists = useSelector(artistsSearchResponse)
    const tracks = useSelector(tracksSearchResponse)

    return (
        <div className={styles.find__page_root}>
            <div className={styles.find__page_albums}>
                <h2>Альбомы</h2>
                <div className={styles.find__albums_wrapper}>
                    {
                    albums ? albums.map((item: AlbumsSearchType) => <MusicAlbumCard 
                                                            name={item.name}
                                                            id={item.id}
                                                            img={item.images[1] ? item.images[1].url : AlbumIcon}
                                                            albumImg={item.images[1] ? item.images[1].url : AlbumIcon}
                                                            key={item.id}
                                                        />)
                    :
                    <div>Данные отсутствуют, либо измените параметры поиска</div>
                    }
                </div>
            </div>
            <div className={styles.find__page_artists}>
                <h2>Артисты</h2>
                <div className={styles.find__artists_wrapper}>
                    {
                        artists ? artists.map((item: ArtistsType) => <MusicAlbumCard 
                                                                name={item.name}
                                                                id={item.id}
                                                                img={item.images[1] ? item.images[1].url : AlbumIcon}
                                                                albumImg={item.images[1] ? item.images[1].url : AlbumIcon}
                                                                key={item.id}
                                                            />)
                        :
                        <div>Данные отсутствуют, либо измените параметры поиска</div>
                    }
                </div>
            </div>
            <div className={styles.find__page_tracks}>
                <h2>Треки</h2>
                <div className={styles.find__tracks_wrapper}>
                    {
                    tracks ? tracks.map((item: TracksType) => <MusicAlbumCard 
                                                            name={item.name}
                                                            id={item.id}
                                                            img={item.album.images[1] ?  item.album.images[1].url : AlbumIcon}
                                                            albumImg={item.album.images[1] ?  item.album.images[1].url : AlbumIcon}
                                                            key={item.id}
                                                        />)
                    :
                    <div>Данные отсутствуют, либо измените параметры поиска</div>
                    }
                </div>
            </div>
        </div>
    )
}