import React from 'react'
import styles from './UserCard.module.scss'
import userWithoutPhoto from '../../img/user_without_photo.png'
import {useHistory} from 'react-router-dom'

type PropsType = {
    name:string
    id:number
    uniqueUrlName: string | null
    status: string | null
    followed: boolean
    photo: string | null
}


const UserCard: React.FC<PropsType> = ({name, id, status, followed, photo}) => {

    const history = useHistory()

    const showUserProfile = () => {
        history.push(`/profile/${id}`)
    }

    return (
        <div className={styles.userCard__wrapper}>
            <div className={styles.user__card_icon}>
                {
                    photo ? <img src={photo} alt="user_icon"/>
                    : <img src={userWithoutPhoto} alt="user_icon" />
                }
                
            </div>

            <div className={styles.user__card_name}>
                {name ? name : "Имя отсутствует"}
            </div>
            
            <div className={styles.user__card_status}>
                {
                    status ? status : null
                }
            </div>    
            <button onClick={() => showUserProfile()}>show profile</button>
        </div>
    )
}

export default UserCard