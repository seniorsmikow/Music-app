import React from 'react'
import { useDispatch } from 'react-redux'
import {toogleOpenModalWindow} from '../../redux/app_reducer'
import styles from './HeaderMenu.module.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
    isOpen: boolean
}


export const HeaderMenu: React.FC<PropsType> = ({isOpen}) => {

    const dispatch = useDispatch()
    
    return (
        <div className={isOpen ? styles.header__menu : styles.header__menu_close}
            onClick={() => dispatch(toogleOpenModalWindow(false))}
        >
                <ul>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/profile">Профиль</NavLink>
                    <NavLink to="/login">Войти</NavLink>
                </ul>
        </div>
    )
}