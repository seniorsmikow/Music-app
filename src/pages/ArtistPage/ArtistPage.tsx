import { useEffect, useState } from 'react'
import styles from './ArtistPage.module.scss'
import { getArtistData, getArtistAlbums } from '../../redux/music_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { ArtistAlbums } from '../../components/ArtistAlbums/ArtistAlbums'
import { getArtist, handlerLoading } from '../../redux/selectors/musicSelectors'


export const ArtistPage = (props: any) => {

    const artistId = props.match.params.artistId
    console.log(artistId)
    const dispatch = useDispatch()
    const artistData = useSelector(getArtist)
    const isLoading = useSelector(handlerLoading)
    const [isLikeArtist, setIsLikeArtist] = useState(false)

    useEffect(() => {
        if(artistId) {
            dispatch(getArtistData(artistId))
        }
    }, [artistId, dispatch])

    useEffect(() => {
        dispatch(getArtistAlbums(artistId))
    }, [artistId, dispatch])

    const likeArtist = () => {
        setIsLikeArtist(!isLikeArtist)
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