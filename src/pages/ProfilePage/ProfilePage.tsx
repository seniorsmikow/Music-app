import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './ProfilePage.module.scss'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import { FriendsBlock } from '../../components/FriendsBlock/FriendsBlock'
import {getUserProfile} from '../../redux/profile_reducer'
import { AppStateType } from '../../redux/root_reducer'


export const ProfilePage = () => {

    const dispatch = useDispatch()
    const userId  = useSelector((state: AppStateType) => state.profileReducer.userId)
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const history = useHistory()

    useEffect(() => {
        if(userId) {
            dispatch(getUserProfile(userId))
        }
    }, [userId, dispatch])

    useEffect(() => {
        if(!isAuth) {
            history.push('/newspage')
        }
    })

    return (
        <div className={styles.profile__page_root}>
            <ProfileInfo />
            <FriendsBlock />
        </div>
    )
}