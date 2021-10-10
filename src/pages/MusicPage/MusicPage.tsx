import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './MusicPage.module.scss'
import { getMusic, getElseMusic } from '../../redux/music_reducer'
import { AppStateType } from '../../redux/root_reducer'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'


export const MusicPage = () => {

    const dispatch = useDispatch()
    const albums = useSelector((state: AppStateType) => state.musicReducer.data)
    const [items, setItems] = useState(albums)
    const [country, setCountry] = useState('US')
    const [page, setPage] = useState(0)

    const letTheMusicPlay = () => {
        dispatch(getMusic(country))
    }

    const letTheNextPage = () => {
        setPage(page + 1)
        dispatch(getElseMusic(country, page + 2))
    }

    useEffect(() => {

        if(albums) {
            setItems(albums)
        }
    }, [albums])

    const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setCountry(value)
        dispatch(getMusic(value))
    }

    console.log(items, country)
    
    return (
        <div className={styles.music__page_root}>
            Music Page
            <div>
            Новые релизы в стране 
                <select name="country" onChange={selectCountry}>
                    <option value="RU">Russia</option>
                    <option value="UA">Ukraine</option>
                    <option value="BY">Belarus</option>
                    <option value="US">USA</option>
                </select>
            </div>
            {
                items ? items.map((item: any) => <div key={item.id}>
                    <MusicAlbumCard 
                    album_type={item.album_type}
                    name={item.name}
                    release_date={item.release_date}
                    total_tracks={item.total_tracks}
                    image={item.images[0].url}
                    artistName={item.artists[0].name}
                    artistId={item.artists[0].id}
                /></div>) : null
            }
            <button onClick={() => letTheMusicPlay()}>
                get music
            </button>
            <button onClick={() => letTheNextPage()}>
                next page
            </button>
        </div>
    )
}