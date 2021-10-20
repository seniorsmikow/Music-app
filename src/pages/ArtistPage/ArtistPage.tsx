import { useEffect, useState } from 'react'
import styles from './ArtistPage.module.scss'
import { getArtistData} from '../../redux/music_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { ArtistAlbums } from '../../components/ArtistAlbums/ArtistAlbums'


export const ArtistPage = (props: any) => {

    const artistId = props.match.params.artistId
    const dispatch = useDispatch()
    const artistData = useSelector((state: AppStateType) => state.musicReducer.artistData)
    const [data, setData] = useState(artistData)
    const [isLikeArtist, setIsLikeArtist] = useState(false)

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

    const likeArtist = () => {
        setIsLikeArtist(!isLikeArtist)
    }

    console.log(data.id)

    return (
        <div className={styles.artist__page_root}>
            {
                data ? 
                <>
                    <div>
                        <h1>{data.name}</h1>
                    </div>
                    <div className={styles.artist__main_icon}>
                        <img src={data.images[1].url} alt="artist"/>
                    </div>
                    <div className={styles.artists__total_likes}>
                        <div onClick={() => likeArtist()} className={styles.artist__like_icon}>
                            {
                                isLikeArtist ? <FavoriteIcon color="error" fontSize="large"/> : <FavoriteBorderIcon color="error" fontSize="large"/>
                            }
                        </div>
                        <>{data.followers.total}</>
                    </div>
                    <div className={styles.artists__genres_list}>
                        {
                            <Stack direction="row" spacing={1}>
                             { data.genres.map((genre: string) => <Chip label={genre} key={genre} className={styles.genre}/>) }
                            </Stack>
                            
                        }
                    </div>
                </>
                : 
                <LoaderTwo />
            }
            {/* <div>
                <ArtistAlbums artistId={data.id}/>
            </div> */}
        </div>
    )
}