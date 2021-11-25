import { useEffect, useState } from 'react'
import styles from './ArtistPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { ArtistAlbums } from '../../components/ArtistAlbums/ArtistAlbums'
import { fetchArtistData, getLoading } from '../../redux/selectors/musicSelectors'
import { getArtistData, getArtistAlbums } from '../../redux/music_reducer'
import { useParams } from 'react-router-dom'
import { setIdOfLikedMusic, MusicData } from '../../redux/profile_reducer'
import { MusicEnum } from '../../redux/profile_reducer'
import { getNotification } from '../../redux/app_reducer'

interface RouteParams {
    artistId: string
}


export const ArtistPage = () => {

    const params = useParams<RouteParams>()
    const {artistId} = params

    const artistData = useSelector(fetchArtistData)
    const isLoading = useSelector(getLoading)
    const [isLikeArtist, setIsLikeArtist] = useState(false)
    const [data, setData] = useState<MusicData | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistData(artistId))
    }, [dispatch, artistId])

    useEffect(() => {
        dispatch(getArtistAlbums(artistId, 0, 5))
        if(artistData && artistId) {
            setData({name: artistData.name, id: artistId, image: artistData.images[1].url})
        }
    }, [dispatch, artistId, artistData])

    const likeArtist = () => {
        setIsLikeArtist(!isLikeArtist)
        if(data) {
            dispatch(setIdOfLikedMusic(data, MusicEnum.ARTIST))
            dispatch(getNotification(1, `Артист ${data.name} добавлен в коллекцию`))
        }
    }

    return (
        <div className={styles.artist__page_root}>
            {
                artistData ? 
                <>
                    <div>
                        <h1>{artistData.name}</h1>
                    </div>
                    <div className={styles.artist__main_icon}>
                        <img src={artistData.images[1].url} alt="artist"/>
                    </div>
                    <div className={styles.artists__total_likes}>
                        <div onClick={() => likeArtist()} className={styles.artist__like_icon}>
                            {
                                isLikeArtist ? <FavoriteIcon color="error" fontSize="large"/> : <FavoriteBorderIcon color="error" fontSize="large"/>
                            }
                        </div>
                        <>{artistData.followers.total}</>
                    </div>
                    <div className={styles.artists__genres_list}>
                        {
                            <Stack direction="row" spacing={1}>
                             { artistData.genres.map((genre: string) => <Chip label={genre} key={genre} className={styles.genre}/>) }
                            </Stack>
                        }
                    </div>
                </>
                : 
                <LoaderTwo />
            }
            <div>
                {
                    isLoading ? <LoaderTwo /> : <ArtistAlbums />
                }
            </div>
        </div>
    )
}