import React, { useEffect, useState } from 'react'
import styles from './LoginPage.module.scss'
import { LoginRegForm } from '../../forms/LoginRegForm/LoginRegForm'
import { toggleFormType } from '../../redux/app_reducer'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { useHistory } from 'react-router-dom'
import { EntryFormType } from '../../types/auth_types'


export const LoginRegPage = () => {

    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const userId = useSelector((state: AppStateType) => state.authReducer.userId)
    const formType = useSelector((state: AppStateType) => state.appReducer.formType)
    const error = useSelector((state: AppStateType) => state.authReducer.error)
    const registrationMessage = useSelector((state: AppStateType) => state.authReducer.registrationMessage)
    const dispatch = useDispatch()
    const [type, setType] = useState<string>(formType)
    const [loginError, setLoginError] = useState<string | null>(null)
    const history = useHistory()

    useEffect(() => {
        if(isAuth && userId) {
            history.push(`/profile/${userId}`)
        }
    }, [isAuth, userId, history])

    useEffect(() => {
        if(registrationMessage) {
            return alert(registrationMessage)
        }
    }, [registrationMessage])

    useEffect(() => {
        if(error) {
            setLoginError(error)
        }
    }, [error])

    const changeFormType = (type: EntryFormType) => {
        setType(type)
        dispatch(toggleFormType(type))
        setLoginError(null)
    }

    return (
        <div className={styles.login__page_root}>

            {
                loginError && <div className={styles.login_page_error}>{loginError}</div>
            }

            <LoginRegForm />
            {
                type === 'login' ? 
                    <div className={styles.registration__link}>
                        Впервые на сайте?
                        Моментальная 
                        <button onClick={() => changeFormType('registration')}>регистрация</button>
                    </div>
                : <div className={styles.registration__link}>
                    Есть аккаунт?
                    <button onClick={() => changeFormType('login')}>Вход</button>
                    </div>
            }
        </div>
    )
}