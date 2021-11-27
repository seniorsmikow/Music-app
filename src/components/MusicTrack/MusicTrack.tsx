import styles from './MusicTrack.module.scss'
import { showTrackTime } from '../../helpers/time'
import AddIcon from '@mui/icons-material/Add'

type PropsType = {
    id: string
    track_number: number
    name: string
    duration_ms: number
}


export const MusicTrack: React.FC<PropsType> = ({id, track_number, name, duration_ms}) => {
    return (
        <div className={styles.music__track_root}>
            <div>{track_number}</div>
            <div className={styles.music__track_name}>{name}</div>
            <div className={styles.music__track_handle}>
                <AddIcon />
            </div>
            <div>{showTrackTime(duration_ms)}</div>
        </div>
    )
}