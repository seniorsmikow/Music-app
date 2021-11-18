import { showTrackTime } from '../../helpers/time'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumData } from '../../redux/album_reducer'
import { getAlbum } from '../../redux/selectors/musicSelectors'
import styles from './AlbumInfo.module.scss'
import { useState, useEffect, useCallback } from 'react'
import { AlbumDataType, AlbumItemType} from '../../types/albums_types'
import Button from '@mui/material/Button'

type PropsType = {
    albumId: string
}


export const AlbumInfo: React.FC<PropsType> = ({albumId}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAlbumData(albumId))
    }, [albumId, dispatch])

    const album = useSelector(getAlbum)
    const [totalTime, setTotalTime] = useState(0)
    const [time, setTime] = useState<Array<number>>([])
    const [sorted, setSorted] = useState(false)
    const [tracks, setTracks] = useState<Array<AlbumItemType> | null>(null)

    useEffect(() => {
        if(album) {
            setTracks(album.items)
        }
    }, [])

    //console.log(tracks[0].name)
    
    const getTotalTracksTime = useCallback((tracks: Array<AlbumItemType>) => {
        setTime(tracks.map((track: AlbumItemType) => time.push(track.duration_ms)))
        setTotalTime(Math.round(time.reduce((sum: number, current: number) => sum + current, 0) / 1000 / 60))
    }, [time])

    useEffect(() => {
        if(album && tracks) {
            getTotalTracksTime(tracks)
        }
    }, [album])

    const sortedTracks = () => {
        if(sorted && album) {
            setTracks(album.items)
            setSorted(false)
        } else if (album) {
            setTracks(album.items.sort(function(a,b){
                if(a.duration_ms > b.duration_ms) return -1
                return 0
            }))
            setSorted(true)
        }
    } 

    return (
        <div className={styles.album__info_root}>
            <Button variant="outlined" className={styles.album__info_button} onClick={() => sortedTracks()}>
                    {
                        sorted ? 'Отменить' : 'Начать с долгих треков'
                    }
            </Button>

            <div>Длительность альбома: {totalTime} мин</div>
            
            <div className={styles.album__info_tracks}>
                {
                    tracks && tracks.map((item: AlbumItemType) => <div key={item.id} className={styles.album__info_track}>
                        {item.track_number} - {item.name} - {showTrackTime(item.duration_ms)} мин
                    </div>)
                }
            </div>
        </div>
    )
}