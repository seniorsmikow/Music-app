import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/auth_reducer'
import { AppStateType } from '../../redux/root_reducer'
import {toogleOpenModalWindow} from '../../redux/app_reducer'
import styles from './HeaderMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'

type PropsType = {
    isOpen: boolean
}


export const HeaderMenu: React.FC<PropsType> = ({isOpen}) => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const ownUserId = useSelector((state: AppStateType) => state.authReducer.userId)
    const history = useHistory()

    const userLogout = () => {
        dispatch(logout())
        history.push('/')
    }
    
    return (
        <div className={isOpen ? styles.header__menu : styles.header__menu_close}
            onClick={() => dispatch(toogleOpenModalWindow(false))}
        >
                <ul>
                    <NavLink to="/">Главная</NavLink>
                    { 
                        isAuth && ownUserId ? <ul>
                                                <NavLink to={`/profile/${ownUserId}`}>Своя страница</NavLink> 
                                                <NavLink to="/new_releases">Новые релизы</NavLink>
                                            </ul> 

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