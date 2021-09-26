import React, { useEffect } from 'react'
import styles from './ProfileInfo.module.scss'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CancelIcon from '@material-ui/icons/Cancel'
import { profileType } from '../../types/profile_types'
import { AppStateType } from '../../redux/root_reducer'
import { useSelector, useDispatch } from 'react-redux'
import { followUser, checkIsUserFriend } from '../../redux/users_reducer'
import { getNotification } from '../../redux/app_reducer'
import userWithoutPhoto from '../../img/user_without_photo.png'

type PropsType = {
    profile: profileType
}


const ProfileInfo: React.FC<PropsType> = ({profile}) => {

    const dispatch = useDispatch()
    const isFollow = useSelector((state: AppStateType) => state.usersReducer.follow)
    const notificationCount = useSelector((state: AppStateType) => state.appReducer.notificationCount)
    const authUserId = useSelector((state: AppStateType) => state.authReducer.userId)
    
    useEffect(() => {
        dispatch(checkIsUserFriend(profile.userId))
    }, [profile.userId, dispatch])

    const follow= (userId: number) => {
        dispatch(followUser(userId))
        dispatch(getNotification(notificationCount + 1, `Вы добавили пользователя ${profile.fullName} в друзья`))
    }

    return (
        <div className={styles.profile__wrapper}>
            <div className={styles.profile__header}></div>
            <div className={styles.profile__header_round}></div>
            <div className={styles.profile__image}>
                {
                    profile.photos.large ? <img src={profile.photos.large} alt="user_icon"/> 
                    : <img src={userWithoutPhoto} alt="user_icon"/>
                }
                
            </div>

            <div className={styles.profile__user_name}>
                {profile.fullName ? profile.fullName : "Имя отсутствует"}
            </div>
            <div>
                о пользователе: {
                    profile.aboutMe ? profile.aboutMe : "нет данных"
                }
            </div>
            <div className={styles.profile__user_profession}>
                профессия: {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "неизвестно"}
            </div>
            <div>
                в поисках работы: {
                    profile.lookingForAJob ? <CheckBoxIcon /> : <CancelIcon />
                }
            </div>
            {
                profile.contacts ? 
                <select name="контакты">
                    <option value="facebook">{profile.contacts.facebook}</option>
                    <option value="VK">{profile.contacts.vk}</option>
                    <option value="website">{profile.contacts.website}</option>
                    <option value="twitter">{profile.contacts.twitter}</option>
                    <option value="instagram">{profile.contacts.instagram}</option>
                    <option value="youtube">{profile.contacts.youtube}</option>
                    <option value="github">{profile.contacts.github}</option>
                    <option value="mainLink">{profile.contacts.mainLink}</option>
                </select>
                : <div>
                    User not add contacts
                </div>
            }
            
            {
                authUserId === profile.userId ? null 
                :
                <div className={styles.profile__button}>
                    <button onClick={() => follow(profile.userId)} className={isFollow ? styles.unFollowBtn : styles.followBtn}>
                        { 
                            isFollow ? "Удалить из друзей" : "Добавить в друзья"
                        }
                    </button>
                </div>
            }
        </div>
    )
}

export default ProfileInfo