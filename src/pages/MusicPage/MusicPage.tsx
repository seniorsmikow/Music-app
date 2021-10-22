import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './MusicPage.module.scss'
import { getCategories } from '../../redux/music_reducer'
import { AppStateType } from '../../redux/root_reducer'
import { MusicAlbumCard } from '../../components/MusicAlbumCard/MusicAlbumCard'


export const MusicPage = () => {

    const dispatch = useDispatch()
    const albums = useSelector((state: AppStateType) => state.musicReducer.newReleasesData)
    const categories = useSelector((state: AppStateType) => state.musicReducer.categories)
    const searchAnswer = useSelector((state: AppStateType) => state.musicReducer.queryResponse)
    const [items, setItems] = useState(albums)
    const [setData] = useState(categories)
    const [answer, setAnswer] = useState(searchAnswer)

    

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
    }, [categories, setData])

    useEffect(() => {
        if(searchAnswer) {
            setAnswer(searchAnswer)
        }
    }, [searchAnswer])

    
    return (
        <div className={styles.music__page_root}>
            
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
            <button onClick={() => showCategories()}>
                get categories
            </button>
        </div>
    )
}