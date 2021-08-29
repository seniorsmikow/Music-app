import React from 'react'
import styles from './ProfileInfo.module.scss'
import portrait from '../../img/portrait.jpg'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'


const ProfileInfo = () => {

    const userLoginText = useSelector((state: AppStateType) => state.authReducer.login)

    return (
        <div className={styles.profile__wrapper}>
            <div className={styles.profile__header}></div>
            <div className={styles.profile__header_round}></div>
            <div className={styles.profile__image}>
                <img src={portrait} alt="user_icon"/>
            </div>

            <div className={styles.profile__user_name}>
                {userLoginText ? userLoginText : "Имя отсутствует"}
            </div>
            <div className={styles.profile__user_profession}>
                профессия:  пользователя 
            </div>

            <div className={styles.profile__user_following}>
                Following
                <div className={styles.profile__following_count}>
                    35
                </div>
            </div>
            <div className={styles.profile__user_followers}>
                Followers 
                <div className={styles.profile__followers_count}>
                    129
                </div>
            </div>

            <div className={styles.profile__button}>
                <button>Show profile</button>
            </div>

        </div>
    )
}

export default ProfileInfo