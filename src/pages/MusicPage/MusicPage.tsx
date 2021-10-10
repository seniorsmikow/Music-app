import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './MusicPage.module.scss'
import { getMusic, getCategories } from '../../redux/music_reducer'
import { AppStateType } from '../../redux/root_reducer'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'


export const MusicPage = () => {

    const dispatch = useDispatch()
    const albums = useSelector((state: AppStateType) => state.musicReducer.data)
    const categories = useSelector((state: AppStateType) => state.musicReducer.categories)
    const searchAnswer = useSelector((state: AppStateType) => state.musicReducer.queryResponse)
    const [items, setItems] = useState(albums)
    const [country, setCountry] = useState('US')
    const [countAlbum, setAlbumCount] = useState(5)
    const [data, setData] = useState(categories)
    const [answer, setAnswer] = useState(searchAnswer)

    const letTheMusicPlay = () => {
        dispatch(getMusic(country, countAlbum))
    }

    const showCategories = () => {
        dispatch(getCategories())
    }

    useEffect(() => {
        if(albums) {
            setItems(albums)
        }
    }, [albums])

    useEffect(() => {
        if(categories) {
            setData(categories)
        }
    }, [categories])

    useEffect(() => {
        if(searchAnswer) {
            setAnswer(searchAnswer)
        }
    }, [searchAnswer])

    const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setCountry(value)
        dispatch(getMusic(value, countAlbum ))
    }

    const selectAlbumCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setAlbumCount(+value)
        dispatch(getMusic(country, +value))
    }

    console.log(data)
    
    return (
        <div className={styles.music__page_root}>
            <h1>Новые релизы</h1>
            <div>
            Новые релизы в стране 
                <select name="country" onChange={selectCountry}>
                    <option value="US">USA</option>
                    <option value="RU">Russia</option>
                    <option value="UA">Ukraine</option>
                    <option value="BY">Belarus</option>
                </select>
            </div>
            <div>
            Показывать по   
                <select name="albumCount" onChange={selectAlbumCount}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            новых релизов
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
            {
                categories ? categories.map((cat: any) => <div key={cat.id}>{cat.name}</div>) : null
            }
            {
              answer   ? answer.map((an: any) => <div key={an.id}>{an.name}</div>) : null
            }
            <button onClick={() => letTheMusicPlay()}>
                get music
            </button>
            <button onClick={() => showCategories()}>
                get categories
            </button>
        </div>
    )
}