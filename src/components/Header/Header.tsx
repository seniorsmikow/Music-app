import React, {useState, useEffect} from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Portrait from '../../img/portrait.jpg'
import {useSelector, useDispatch} from 'react-redux'
import {toogleOpenModalWindow} from '../../redux/app_reducer'
import { AppStateType } from '../../redux/root_reducer'
import {logout} from '../../redux/auth_reducer'


const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const [btnText, setBtnText] = useState('Login') 

    useEffect(() => {
        if(isAuth) {
            setBtnText('Logout')
        }
    }, [isAuth])

    const loginOrLogoutBtn = (btnText: string) => {
        if(btnText === 'Logout') {
            dispatch(logout())
            setBtnText('Login')
        } else {
            dispatch(toogleOpenModalWindow(true))
        }
    }

    return (
        <div className={styles.header__wrapper}>

            <div className={styles.header__search_input}>
                <input placeholder="Поиск..."/>
                <SearchIcon />  
            </div>
            
            <ul className={styles.header__listWrapper}>
                {
                    isAuth ? 
                    <NavLink to="/profile"><AccountBoxIcon />Profile</NavLink>
                    : null
                }
                <NavLink to="/"><HomeIcon />Home</NavLink>
            </ul>

            <div>
                <div className={styles.header__user_block}>
                    <img src={Portrait} alt="user_icon"/>
                    <button onClick={() => loginOrLogoutBtn(btnText)}>{isAuth ? 'Logout' : 'Login'}</button>
                </div>
            </div>
        </div>
    )
}

export default Header