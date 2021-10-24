import { GhostAnimation } from '../../components/GhostAnimation/GhostAnimation'
import styles from './HomePage.module.scss'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router'


export const HomePage = () => {

    const history = useHistory()

    const toNewReleases = () => {
        history.push('/new_releases')
    }

    return (
        <div className={styles.home__page_root}>
            <div className={styles.home__animation_block}>
                <GhostAnimation /> 
            </div>
            <div className={styles.home__page_text}>
                <h1>Не знаете, что послушать?</h1>
                <div>
                    Начните с лучших новинок.
                </div>
            </div>
            <div className={styles.home__button_news}>
                <Button variant="contained" onClick={() => toNewReleases()}>Перейти к новинкам</Button>
            </div>
        </div>
    )
}