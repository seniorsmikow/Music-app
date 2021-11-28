import { useState, useEffect } from 'react'
import styles from './MusicTrack.module.scss'
import { showTrackTime } from '../../helpers/time'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import { useDispatch, useSelector } from 'react-redux'
import { setIdOfLikedMusic, MusicEnum } from '../../redux/profile_reducer'
import { getLikedTracks } from '../../redux/selectors/musicSelectors'
import { getNotification } from '../../redux/app_reducer'

type PropsType = {
    id: string
    track_number: number
    name: string
    duration_ms: number
}


export const MusicTrack: React.FC<PropsType> = ({id, track_number, name, duration_ms}) => {

    const dispatch = useDispatch()
    const likedTracks = useSelector(getLikedTracks)
    const [isLiked, setIsLiked] = useState(false)

    const addTrackToCollection = () => {
        dispatch(setIdOfLikedMusic({
            name: name,
            id: id,
        }, MusicEnum.TRACK))
        dispatch(getNotification(1, `Вы добавили трек ${name} в вашу коллекцию`))
        setIsLiked(true)
    }

    const checkIsTrackLiked = () => {
        setIsLiked(likedTracks.map(el => el.id).includes(id))
    }

    useEffect(() => {
        checkIsTrackLiked()
    }, [])

    return (
        <div className={isLiked ? styles.music__track_active : styles.music__track_root}>
            <div>{track_number}</div>
            <div className={styles.music__track_name}>{name}</div>
            <div className={styles.music__track_handle} onClick={() => addTrackToCollection()}>
                {
                    isLiked ? <CheckIcon /> : <AddIcon />
                }
            </div>
            <div>{showTrackTime(duration_ms)}</div>
        </div>
    )
}