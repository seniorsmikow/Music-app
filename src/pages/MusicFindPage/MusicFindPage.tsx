import styles from './MusicFindPage.module.scss'
import { useSelector } from 'react-redux'
//import { useEffect } from 'react'
import { albumsSearchResponse, artistsSearchResponse, tracksSearchResponse } from '../../redux/selectors/musicSelectors'
//import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'


export const MusicFindPage = () => {

    const albums = useSelector(albumsSearchResponse)
    const artists = useSelector(artistsSearchResponse)
    const tracks = useSelector(tracksSearchResponse)

    return (
        <div className={styles.find__page_root}>
            <h2>Альбомы</h2>
            <div className={styles.find__albums_wrapper}>
                {
                albums ? albums.map((item: any) => <MusicAlbumCard 
                                                        name={item.name}
                                                        id={item.id}
                                                        img={item.images[1].url}
                                                        albumImg={item.images[1].url}
                                                        key={item.id}
                                                    />)
                :
                null
                }
            </div>
            <h2>Артисты</h2>
            <div className={styles.find__artists_wrapper}>
                {
                    artists ? artists.map((item: any) => <MusicAlbumCard 
                                                            name={item.name}
                                                            id={item.id}
                                                            img={item.images[1].url}
                                                            albumImg={item.images[1].url}
                                                            key={item.id}
                                                        />)
                    :
                    null
                }
            </div>
            <h2>Треки</h2>
            <div className={styles.find__tracks_wrapper}>
                {
                tracks ? tracks.map((item: any) => <MusicAlbumCard 
                                                        name={item.name}
                                                        id={item.id}
                                                        img={item.album.images[1].url}
                                                        albumImg={item.album.images[1].url}
                                                        key={item.id}
                                                    />)
                :
                null
                }
            </div>
        </div>
    )
}