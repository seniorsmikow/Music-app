import React, {useState} from 'react'
import { FriendSmallCard } from '../FriendSmallCard/FriendSmallCard'
import styles from './FriendsBlock.module.scss'


export const FriendsBlock = () => {

    const [friends] = useState([1, 2, 3, 4, 5])

    return (
        <div className={styles.friends__block_root}>
            Друзья
            {
                friends.map(friend => <FriendSmallCard key={friend}/>)
            }
        </div>
    )
}