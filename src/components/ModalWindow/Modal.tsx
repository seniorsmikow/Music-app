import React from 'react'
import styles from './ModalWindow.module.scss'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {useDispatch} from 'react-redux'
import {toogleOpenModalWindow} from '../../redux/app_reducer'

type PropsType = {
    children: React.ReactNode
    isOpen: boolean
}


export const Modal: React.FC<PropsType> = ({children, isOpen}) => {

    const dispatch = useDispatch()

    return (
        <div className={isOpen ? styles.modal__window_open : styles.modal__window_close} >

            <div className={styles.modal__children}>{children}</div>
            
            <div className={styles.modal__close_icon}><HighlightOffIcon fontSize="large" onClick={() => dispatch(toogleOpenModalWindow(false))}/></div>
        </div>
    )
}