import React from 'react'
import styles from './Header.module.scss'
import SearchIcon from '@material-ui/icons/Search'
import userWithoutPhoto from '../../img/user_without_photo.png'
import {useSelector, useDispatch} from 'react-redux'
import {toogleOpenModalWindow} from '../../redux/app_reducer'
import { AppStateType } from '../../redux/root_reducer'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'


const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
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
                        Вразработке
                    </div>
                    <div className={styles.header__search_input}>
                        <input placeholder="Поиск..."/>
                        <SearchIcon fontSize="large"/>  
                    </div>
                    <div className={styles.header__note_icon}>
                        <NotificationsNoneIcon fontSize="large"/>
                    </div>
                </div>

                <div>
                    
                        
                         {/* <div className={styles.header__user_block}>
                             <img src={profile.photos.small} alt="user_icon"/> 
                             <ExpandMoreIcon fontSize="large" onClick={() => dispatch(toogleOpenModalWindow(!isOpen))}/>
                         </div> */}
                        
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