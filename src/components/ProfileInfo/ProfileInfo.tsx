import React from 'react'
import styles from './ProfileInfo.module.scss'
import portrait from '../../img/portrait.jpg'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CancelIcon from '@material-ui/icons/Cancel'
import {profileType} from '../../types/profile_types'

type PropsType = {
    profile: profileType
}


const ProfileInfo: React.FC<PropsType> = ({profile}) => {

    const userLoginText = useSelector((state: AppStateType) => state.authReducer.login)
    const userPhoto = useSelector((state: AppStateType) => state.profileReducer.profile?.photos.large)

    return (
        <div className={styles.profile__wrapper}>
            <div className={styles.profile__header}></div>
            <div className={styles.profile__header_round}></div>
            <div className={styles.profile__image}>
                {
                    userPhoto ? <img src={userPhoto} alt="user_icon"/> 
                    : <img src={portrait} alt="user_icon"/>
                }
                
            </div>

            <div className={styles.profile__user_name}>
                {userLoginText ? userLoginText : "Имя отсутствует"}
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
            

            <div className={styles.profile__button}>
                <button>Show profile</button>
            </div>

        </div>
    )
}

export default ProfileInfo