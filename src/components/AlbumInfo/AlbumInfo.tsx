import { showTrackTime } from '../../helpers/time'
import styles from './AlbumInfo.module.scss'
import { useState, useEffect, useCallback } from 'react'
import { AlbumInfoType} from '../../types/music_types'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { handleActiveElement } from '../../redux/artist_reducer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

type PropsType = {
    items: Array<AlbumInfoType>
}


export const AlbumInfo: React.FC<PropsType> = ({items}) => {

    const dispatch = useDispatch()

    const [totalTime, setTotalTime] = useState(0)
    const [time, setTime] = useState<Array<number>>([])
    const [tracks, setTracks] = useState<Array<AlbumInfoType>>([...items])
    const [sorted, setSorted] = useState(false)

    const getTotalTracksTime = useCallback((items: Array<AlbumInfoType>) => {
        setTime(items.map((item: AlbumInfoType) => time.push(item.duration_ms)))
        setTotalTime(Math.round(time.reduce((sum: number, current: number) => sum + current, 0) / 1000 / 60))
    }, [time])

    useEffect(() => {
        getTotalTracksTime(items)
    }, [items])

    const sortedTracks = () => {
        if(sorted) {
            setTracks([...items])
            setSorted(false)
        } else {
            setTracks(tracks.sort(function(a,b){
                if(a.duration_ms > b.duration_ms) return -1
                return 0
            }))
            setSorted(true)
        }
    }   
    
    const closeEl = () => {
        dispatch(handleActiveElement(false))
    }

    return (
        <div className={styles.album__info_root}>

            <div className={styles.album__close_button}>
                <ExpandLessIcon fontSize="large" onClick={() => closeEl()}/>
            </div>

            <div>Длительность альбома: {totalTime} мин</div>

            <Button variant="outlined" className={styles.album__info_button} onClick={() => sortedTracks()}>
                {
                    sorted ? 'Отменить' : 'Начать с долгих треков'
                }
            </Button>
            <div className={styles.album__info_tracks}>
                {
                    tracks.map((track: AlbumInfoType) => <div key={track.id} className={styles.album__info_track}>
                        {track.track_number} - {track.name} - {showTrackTime(track.duration_ms)} мин
                    </div>)
                }
            </div>
        </div>
    )
}