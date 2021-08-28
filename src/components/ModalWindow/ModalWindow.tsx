import React from 'react'
import styles from './Back.module.scss'
import { Modal } from './Modal'


type PropsType = {
    children: React.ReactNode
    isOpen: boolean
}


export const ModalWindow: React.FC<PropsType> = ({children, isOpen}) => {

    return (
        <div className={isOpen ? styles.back__root_open : styles.back__root_close}>
            <Modal isOpen={isOpen}>{children}</Modal>
        </div>
    )
}

