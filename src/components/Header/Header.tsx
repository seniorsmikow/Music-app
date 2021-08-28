import React from 'react'
import styles from './Header.module.scss'
import HomeIcon from '@material-ui/icons/Home'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import MessageIcon from '@material-ui/icons/Message'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import SearchIcon from '@material-ui/icons/Search'
import Portrait from '../../img/portrait.jpg'
import {useDispatch} from 'react-redux'
import {toogleOpenModalWindow} from '../../redux/app_reducer'


const Header = () => {

    const dispatch = useDispatch()

    return (
        <div className={styles.header__wrapper}>

            <div className={styles.header__search_input}>
                <input placeholder="Поиск..."/>
                <SearchIcon />  
            </div>
            
            <ul className={styles.header__listWrapper}>
                <li><HomeIcon />Home</li>
                <li><ChromeReaderModeIcon />Projects</li>
                <li><MessageIcon />Messages</li>
                <li><NotificationsNoneIcon />Notification</li>
            </ul>

            <div>
                <div className={styles.header__user_block}>
                    <img src={Portrait} alt="user_icon"/>
                    <button onClick={() => dispatch(toogleOpenModalWindow(true))}>login</button>
                </div>
            </div>
        </div>
    )
}

export default Header