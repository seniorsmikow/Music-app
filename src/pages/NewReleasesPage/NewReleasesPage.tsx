import { useState, useEffect} from 'react'
import styles from './NewReleases.module.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NewReleaseCard } from '../../components/NewReleaseCard/NewReleaseCard'
import { getNewReleases } from '../../redux/music_reducer'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import { getReleases } from '../../redux/selectors/musicSelectors'


export const NewReleasesPage = () => {

    const dispatch = useDispatch()
    const releases = useSelector(getReleases)
    const [country, setCountry] = useState<string>('US')
    const [countAlbum, setAlbumCount] = useState<number>(5)

    useEffect(() => {
        dispatch(getNewReleases(country, countAlbum))
    }, [country, countAlbum, dispatch])

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

            <>
                {
                    releases ? 
                    <>
                        {
                        releases.map((release: any) => <div key={release.id}>
                            <NewReleaseCard 
                            album_type={release.album_type}
                            name={release.name}
                            release_date={release.release_date}
                            total_tracks={release.total_tracks}
                            image={release.images[0].url}
                            artistsNames={release.artists}
                            artistId={release.artists[0].id}
                        /></div>) 
                        }
                    </>
                    :
                    <LoaderTwo />
                }
            </>
        </div>
    )
}