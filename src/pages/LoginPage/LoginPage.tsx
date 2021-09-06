import React, {useEffect} from 'react'
import styles from './LoginPage.module.scss'
import { LoginForm } from '../../forms/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { useHistory } from 'react-router-dom'


export const LoginPage = () => {

    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const userId = useSelector((state: AppStateType) => state.authReducer.userId)
    const history = useHistory()

    useEffect(() => {
        if(isAuth && userId) {
            history.push(`/profile/${userId}`)
        }
    }, [isAuth, userId, history])

    return (
        <div className={styles.login__page_root}>
            <LoginForm />
        </div>
    )
}