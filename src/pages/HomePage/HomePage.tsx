import { useEffect } from 'react'
import { GhostAnimation } from '../../components/GhostAnimation/GhostAnimation'
import styles from './HomePage.module.scss'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { isUserAuth } from '../../redux/selectors/authSelectors'
import { getMusicGenres } from '../../redux/genres_reducer'
import { Slider } from '../../components/Slider/Slider'

export const HomePage = () => {

    const history = useHistory()
    const userAuth = useSelector(isUserAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMusicGenres())
    }, [dispatch])

    const toNewReleases = () => {
        if(userAuth) {
            history.push('/new_releases')
        } else {
            history.push('/login')
        }
    }

    return (
        <div className={styles.home__page_root}>
            <div className={styles.home__page_slider}>
                <Slider />
            </div>
            <div className={styles.home__page_main}>
                <div className={styles.home__page_text}>
                    <h1>Не знаете, что послушать?</h1>
                    <div>
                        Начните с лучших новинок.
                    </div>
                </div>
                <div className={styles.home__button_news}>
                    <Button variant="contained" onClick={() => toNewReleases()}>Перейти к новинкам</Button>
                </div>
                <div className={styles.home__animation_block}>
                    <GhostAnimation /> 
                </div>
            </div>
        </div>
    )
}