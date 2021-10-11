import { useState, useEffect} from 'react'
import styles from './NewReleases.module.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'
import { getNewReleases } from '../../redux/music_reducer'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'


export const NewReleasesPage = () => {

    const dispatch = useDispatch()
    const data = useSelector((state: AppStateType) => state.musicReducer.data)
    const isLoader = useSelector((state: AppStateType) => state.musicReducer.isLoading)
    const [newReleases, setNewReleases] = useState(data)
    const [country, setCountry] = useState('US')
    const [countAlbum, setAlbumCount] = useState(5)

    useEffect(() => {
        dispatch(getNewReleases(country, countAlbum))
    }, [country, countAlbum, dispatch])

    useEffect(() => {
        if(data) {
            setNewReleases(data)
        }
    }, [data])

    const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setCountry(value)
        dispatch(getNewReleases(value, countAlbum ))
    }

    const selectAlbumCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setAlbumCount(+value)
        dispatch(getNewReleases(country, +value))
    }

    return (
        <div className={styles.new__releases_root}>
            <h1>Новые релизы</h1>
            <div className={styles.new__releases_select}>
                Новые релизы в стране 
                    <select name="country" onChange={selectCountry}>
                        <option value="US">USA</option>
                        <option value="RU">Russia</option>
                        <option value="UA">Ukraine</option>
                        <option value="BY">Belarus</option>
                    </select>
            </div>
            <div className={styles.new__releases_select}>
                Показывать по   
                    <select name="albumCount" onChange={selectAlbumCount}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                новых релизов
            </div>

            <div>
                {
                    isLoader ? <LoaderTwo /> :
                    <div>
                        {
                        newReleases ? 
                        newReleases.map((release: any) => <div key={release.id}>
                            <MusicAlbumCard 
                            album_type={release.album_type}
                            name={release.name}
                            release_date={release.release_date}
                            total_tracks={release.total_tracks}
                            image={release.images[0].url}
                            artistName={release.artists[0].name}
                            artistId={release.artists[0].id}
                        /></div>) : null
                        }
                    </div>
                }
            </div>
            
            {/* {
                newReleases ? 
                newReleases.map((release: any) => <div key={release.id}>
                    <MusicAlbumCard 
                    album_type={release.album_type}
                    name={release.name}
                    release_date={release.release_date}
                    total_tracks={release.total_tracks}
                    image={release.images[0].url}
                    artistName={release.artists[0].name}
                    artistId={release.artists[0].id}
                /></div>) : null
            } */}
        </div>
    )
}