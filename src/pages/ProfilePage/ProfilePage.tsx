import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './ProfilePage.module.scss'
import { MusicData, deleteMusicInCollection } from '../../redux/profile_reducer'
import { AppStateType } from '../../redux/root_reducer'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TabPanel } from '../../components/Tabs/TabPanel/TabPanel'
import { getArtistsNames } from '../../redux/selectors/musicSelectors'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'


export const ProfilePage = () => {

    //const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const artistsNames = useSelector(getArtistsNames)
    const [value, setValue] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    
    // useEffect(() => {
    //     if(userId) {
    //         dispatch(getUserProfile(userId))
    //     }
    // }, [userId, dispatch])

    useEffect(() => {
        if(!isAuth) {
            history.push('/')
        }
    })

    const toArtistPage = (id: string) => {
        history.push(`/artist/${id}`)
    }

    const deleteArtistInCollection = (artistId: string) => {
        dispatch(deleteMusicInCollection(artistId))
    }

    const toNewRelisesPage = () => {
        history.push('/new_releases')
    }

    return (
        <div className={styles.profile__page_root}>
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
                    Артисты
                    {
                        artistsNames.length ? artistsNames.map((data: MusicData) => <div key={data.id} className={styles.profile__page_artists}>
                            <button onClick={() => toArtistPage(data.id)}>{data.name}</button>
                            <div className={styles.artist__image}>
                                <img src={data.image} alt="artist"/>
                            </div>
                            <button onClick={() => deleteArtistInCollection(data.id)}>
                                <HighlightOffIcon />
                            </button>
                        </div>)
                        : 
                        <div className={styles.profile__page_empty}>
                            Ваша коллекция пуста
                            <button onClick={() => toNewRelisesPage()}>Новые релизы</button>
                        </div>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Альбомы
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Треки
                </TabPanel>
                </Box>
            </div>
        </div>
    )
}