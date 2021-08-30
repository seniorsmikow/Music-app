import React from 'react'
import styles from './UserCard.module.scss'
import Portrait from '../../img/portrait.jpg'

type PropsType = {
    name:string
    id:number
    uniqueUrlName: string | null
    status: string | null
    followed: boolean
}


const UserCard: React.FC<PropsType>  = ({id, name, status, uniqueUrlName, followed = false}) => {

    return (
        <div className={styles.userCard__wrapper}>
            <div className={styles.user__card_icon}>
                <img src={Portrait} alt="user_icon"/>
            </div>

            <div className={styles.user__card_name}>
                {name ? name : "Имя отсутствует"}
            </div>
            
                
                <div>{status}</div>
                <div>{followed}</div>
            
        </div>
    )
}

export default UserCard