import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/auth_reducer'
import { AppStateType } from '../../redux/root_reducer'
import {toogleOpenModalWindow} from '../../redux/app_reducer'
import styles from './HeaderMenu.module.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
    isOpen: boolean
}


export const HeaderMenu: React.FC<PropsType> = ({isOpen}) => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)

    const userLogout = () => {
        dispatch(logout())
    }
    
    return (
        <div className={isOpen ? styles.header__menu : styles.header__menu_close}
            onClick={() => dispatch(toogleOpenModalWindow(false))}
        >
                <ul>
                    <NavLink to="/newspage">Главная</NavLink>
                    <NavLink to="/">Пользователи</NavLink>
                    { 
                        isAuth ? <NavLink to="/profile">Профиль</NavLink> 
                        : null
                    }
                    {
                        isAuth ? <button onClick={() => userLogout()}>Выйти</button> 
                        :
                        <NavLink to="/login">Войти</NavLink>
                    }
                </ul>
        </div>
    )
}