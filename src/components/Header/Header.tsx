import React from 'react'
import styles from './Header.module.scss'
import userWithoutPhoto from '../../img/user_without_photo.png'
import { useSelector, useDispatch } from 'react-redux'
import { toogleOpenModalWindow } from '../../redux/app_reducer'
import { AppStateType } from '../../redux/root_reducer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { Notification } from '../Notification/Notification'
import { NavLink } from 'react-router-dom'


const Header = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector((state: AppStateType) => state.appReducer.toggleOpen)
    const profile = useSelector((state: AppStateType) => state.profileReducer.profile)
    const ownUserId = useSelector((state: AppStateType) => state.authReducer.userId)
    const userId = useSelector((state: AppStateType) => state.profileReducer.profile?.userId)

    return (
        <div className={styles.header__container}>
            <div className={styles.header__wrapper}>

                <div className={styles.header__left_block}>
                    <HeaderMenu isOpen={isOpen}/>
                    <div className={styles.header__logo}>
                        <NavLink to="/">Вразработке</NavLink>
                    </div>
                    <div className={styles.header__search_input}>
                        <input placeholder="Поиск..."/>
                        <SearchIcon />  
                    </div>
                    <div className={styles.header__note_icon}>
                        <Notification />
                    </div>
                </div>

                <div>
                        
                    <div className={styles.header__user_logout}>
                        {   (ownUserId === userId)  && profile && profile.photos.small ? <img src={profile.photos.small} alt="user_icon"/>
                            : <img src={userWithoutPhoto} alt="user_icon"/>
                        }
                        
                        <ExpandMoreIcon fontSize="large" onClick={() => dispatch(toogleOpenModalWindow(!isOpen))}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Header