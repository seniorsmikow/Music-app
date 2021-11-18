import { useEffect, useState, useCallback } from 'react'
import  styles from './AlbumPage.module.scss'
import { useParams } from 'react-router'
import { getAlbumData } from '../../redux/album_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbum, getAlbumTitle, getAlbumImage } from '../../redux/selectors/musicSelectors'
import { AlbumItemType } from '../../types/albums_types'
import Button from '@mui/material/Button'
import { showTrackTime } from '../../helpers/time'

interface RouteParams {
    albumId: string
}


export const AlbumPage = () => {

    const params = useParams<RouteParams>()
    const {albumId} = params
    const dispatch = useDispatch()
    const album = useSelector(getAlbum)
    const title = useSelector(getAlbumTitle)
    const [savedTitle, setSavedTitle] = useState(title)
    const albumImage = useSelector(getAlbumImage)
    const [savedAlbumImage, setSavedAlbumImage] = useState(albumImage)
    const [totalTime, setTotalTime] = useState(0)
    const [time, setTime] = useState<Array<number>>([])
    const [tracks, setTracks] = useState<Array<AlbumItemType> | null>(null)
    enum SortTypes {
        Long = 'Long',
        Short = 'Short',
        Cancel = 'Cancel'
    }
    const[typeSort, setTypeSort] = useState<SortTypes>(SortTypes.Cancel)

    console.log(savedTitle, savedAlbumImage)

    const getTotalTracksTime = useCallback((items: Array<AlbumItemType>) => {
        setTime(items.map((item: AlbumItemType) => time.push(item.duration_ms)))
        setTotalTime(Math.round(time.reduce((sum: number, current: number) => sum + current, 0) / 1000 / 60))
    }, [time])

    useEffect(() => {
        dispatch(getAlbumData(albumId))
    }, [albumId, dispatch])

    useEffect(() => {
        if(album && title && albumImage) {
            setTracks(album.items)
            getTotalTracksTime(album.items)
            setSavedTitle(title)
            setSavedAlbumImage(albumImage)
        }
    }, [album, title, albumImage])

    const sortTracks = (typeSort: SortTypes) => {
        switch (typeSort) {
            case SortTypes.Cancel: 
                setTracks(tracks && tracks.sort((a, b) => a.track_number > b.track_number ? 1 : -1))
                setTypeSort(SortTypes.Cancel)
                break
            case SortTypes.Long: 
                setTracks(tracks && tracks.sort((a, b) => a.duration_ms < b.duration_ms ? 1 : -1))
                setTypeSort(SortTypes.Long)
                break
            case SortTypes.Short: 
                setTracks(tracks && tracks.sort((a, b) => a.duration_ms > b.duration_ms ? 1 : -1))
                setTypeSort(SortTypes.Short)
                break
          }
    }

    return (
        <div className={styles.album__page_root}>
            <div className={styles.album__page_header}>
                <h1>{savedTitle}</h1>
                <div>{totalTime}</div>
                <img src={savedAlbumImage} alt="album"/>
            </div>
            <div className={styles.album__page_buttons}>
                <h3>Сортировать треки</h3>
                <Button variant="outlined" onClick={() => sortTracks(SortTypes.Long)}>Сначала долгие</Button>
                <Button variant="outlined" onClick={() => sortTracks(SortTypes.Short)}>Начать с коротких</Button>
                <Button variant="outlined"onClick={() => sortTracks(SortTypes.Cancel)}>Как задумал автор</Button>
            </div>
            <div className={styles.album__page_tracks}>
                {
                    tracks && tracks.map((item: AlbumItemType) => <div key={item.id} className={styles.album__info_track}>
                    {item.track_number} - {item.name} <span>{showTrackTime(item.duration_ms)}</span></div> )
                }
            </div>
        </div>
    )
}