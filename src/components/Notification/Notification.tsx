import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Notification.module.scss'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { getNotificationsCount, getNotificationsText } from '../../redux/selectors/appSelectors'
import { clearNotifications, deleteNotificationsCount } from '../../redux/app_reducer'


export const Notification = () => {

    const notificationCount = useSelector(getNotificationsCount)
    const notificationText = useSelector(getNotificationsText)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        if(notificationCount) {
            dispatch(deleteNotificationsCount())
        }
        setIsOpen(!isOpen)
    }

    const clear = () => {
        dispatch(clearNotifications())
    }

    return (
        <div className={styles.notification__root} onClick={() => handleOpen()}>
            {
                notificationCount ? <div className={styles.notification__count}>
                                    { notificationCount }
                                </div>
                            : null
            }
            <NotificationsNoneIcon fontSize="large"/>
            <div className={isOpen ? styles.notification__info_wrapper : styles.notification__close}>
                <div>
                {
                    notificationText.length > 0 ? notificationText.map(note => <div className={styles.notification__info_text} key={note}>{note}</div>) 
                                    : <div className={styles.notification__info_text} >Нет новых уведомлений</div>
                }
                </div>
                <button onClick={() => clear()}>Очистить</button>
            </div>
        </div>
    )
}