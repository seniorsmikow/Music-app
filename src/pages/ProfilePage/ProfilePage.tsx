import React from 'react'
import styles from './ProfilePage.module.scss'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'


export const ProfilePage = () => {
    return (
        <div className={styles.profile__page_root}>
            <ProfileInfo />
        </div>
    )
}