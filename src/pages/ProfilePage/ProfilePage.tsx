import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './ProfilePage.module.scss'
import { MusicData, deleteMusicInCollection, DELETE_MUSIC_ENUM } from '../../redux/profile_reducer'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { isUserAuth, getLoading } from '../../redux/selectors/authSelectors'
import { TabPanel } from '../../components/Tabs/TabPanel/TabPanel'
import { getArtistsNames, getLikedAlbums, getLikedTracks } from '../../redux/selectors/musicSelectors'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { LoaderTwo } from '../../components/LoaderTwo/LoaderTwo'


export const ProfilePage = () => {

    const dispatch = useDispatch()
    const userAuth = useSelector(isUserAuth)
    const artistsData = useSelector(getArtistsNames)
    const albumsData = useSelector(getLikedAlbums)
    const tracksData = useSelector(getLikedTracks)
    const isLoadingProfile = useSelector(getLoading)
    const [value, setValue] = useState(0)
    const history = useHistory()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        if(!userAuth) {
            history.push('/')
        }
    })

    const toArtistPage = (id: string) => {
        history.push(`/artist/${id}`)
    }

    const deleteArtistInCollection = (artistId: string, type: DELETE_MUSIC_ENUM) => {
        dispatch(deleteMusicInCollection(artistId, type))
    }

    const toNewRelisesPage = () => {
        history.push('/new_releases')
    }

    return (
        <div className={styles.profile__page_root}> 
            {
                isLoadingProfile ? <div className={styles.profile__page_loader}><LoaderTwo /></div>
                :
                <>
                    <div className={styles.profile__page_title}>
                        <h1>Ваша коллекция музыки</h1>
                    </div>
                    <div className={styles.profile__page_tabs}>
                        <Box sx={{ width: '100%', color: 'white' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Артисты" />
                            <Tab label="Альбомы"  />
                            <Tab label="Треки"  />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <>
                            Артисты
                            {
                                artistsData.length ? artistsData.map((data: MusicData) => <div key={data.id} className={styles.profile__page_artists}>
                                    <button onClick={() => toArtistPage(data.id)}>{data.name}</button>
                                    <div className={styles.artist__image}>
                                        <img src={data.image} alt="artist"/>
                                    </div>
                                    <button onClick={() => deleteArtistInCollection(data.id, DELETE_MUSIC_ENUM.ARTIST)}>
                                        <HighlightOffIcon />
                                    </button>
                                </div>)
                                : 
                                <div className={styles.profile__page_empty}>
                                    Ваша коллекция пуста
                                    <button onClick={() => toNewRelisesPage()}>Новые релизы</button>
                                </div>
                            }
                            </>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <>
                            Альбомы
                            {
                                albumsData.length ? albumsData.map((data: MusicData) => <div key={data.id} className={styles.profile__page_artists}>
                                    <button onClick={() => toArtistPage(data.id)}>{data.name}</button>
                                    <div className={styles.artist__image}>
                                        <img src={data.image} alt="album"/>
                                    </div>
                                    <button onClick={() => deleteArtistInCollection(data.id, DELETE_MUSIC_ENUM.ALBUM)}>
                                        <HighlightOffIcon />
                                    </button>
                                </div>)
                                : 
                                <div className={styles.profile__page_empty}>
                                    Ваша коллекция пуста
                                    <button onClick={() => toNewRelisesPage()}>Новые релизы</button>
                                </div>
                            }
                            </>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <>
                            Треки
                            {
                                tracksData.length ? tracksData.map((data: MusicData) => <div key={data.id} className={styles.profile__page_tracks}>
                                    <button onClick={() => toArtistPage(data.id)}>{data.name}</button>
                                    <button onClick={() => deleteArtistInCollection(data.id, DELETE_MUSIC_ENUM.TRACK)}>
                                        <HighlightOffIcon />
                                    </button>
                                </div>)
                                : 
                                <div className={styles.profile__page_empty}>
                                    Ваша коллекция пуста
                                    <button onClick={() => toNewRelisesPage()}>Новые релизы</button>
                                </div>
                            }
                            </>
                        </TabPanel>
                        </Box>
                    </div>
                </>
            }
        </div>
    )
}