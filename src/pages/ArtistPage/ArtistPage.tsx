import { useEffect, useState } from 'react'
import styles from './ArtistPage.module.scss'
import { getArtistData} from '../../redux/music_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'


export const ArtistPage = (props: any) => {

    const artistId = props.match.params.artistId
    const dispatch = useDispatch()
    const artistData = useSelector((state: AppStateType) => state.musicReducer.artistData)
    const [data, setData] = useState(artistData)

    useEffect(() => {
        if(artistId) {
            dispatch(getArtistData(artistId))
        }
    }, [artistId, dispatch])

    useEffect(() => {
        if(artistData) {
            setData(artistData)
        }
    }, [artistData])

    console.log(data)

    return (
        <div className={styles.artist__page_root}>
            {
                data ? 
                <>
                    <div>
                        {data.name}
                    </div>
                    <div>
                        <img src={data.images[0].url} alt="artist"/>
                    </div>
                    <ul>
                        {
                            data.genres.map((genre: string) => <li key={genre}>{genre}</li>)
                        }
                    </ul>
                    <div>
                        {data.followers.total}
                    </div>
                    <div>
                        {data.popularity}
                    </div>
                </>
                : 
                <LoaderTwo />
            }
            
        </div>
    )
}