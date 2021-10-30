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
import { fetchArtistData, getLoading } from '../../redux/selectors/musicSelectors'
import { useWindowScroll, useWindowSize } from 'react-use'


export const ArtistPage = (props: any) => {

    const {height} = useWindowSize()
    const {y} = useWindowScroll()

    const artistId = props.match.params.artistId
    const dispatch = useDispatch()
    const artistData = useSelector(fetchArtistData)
    const isLoading = useSelector(getLoading)
    const [isLikeArtist, setIsLikeArtist] = useState(false)
    const[offset, setOffset] = useState<number>(0)

    useEffect(() => {
        if(artistId) {
            dispatch(getArtistData(artistId))
        }
    }, [artistId, dispatch])

    useEffect(() => {
        dispatch(getArtistAlbums(artistId, offset, 5))
    }, [artistId, dispatch, offset])

    const likeArtist = () => {
        setIsLikeArtist(!isLikeArtist)
    }

    const doTo = () => {
        dispatch(getArtistAlbums(artistId, offset + 1, 5))
        setOffset(offset + 1)
        console.log(offset)
    }

    // useEffect(() => {
    //     if (y > height) {
    //         dispatch(getArtistAlbums(artistId, offset + 1, 5))
    //         setOffset(offset + 1)
    //         console.log('yes', offset)
    //       }
    // }, [y, height, dispatch, artistId, offset])

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
                <button onClick={() => doTo()}>to</button>
            </div>
        </div>
    )
}