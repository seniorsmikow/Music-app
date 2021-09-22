import React, { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'
import styles from './ScrollToBottom.module.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


export const ScrollToBottom = () => {

    const { y: pageYOffset } = useWindowScroll()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if(pageYOffset > 400) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [pageYOffset])

    const scroll = () => window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth'})

    return (
        <div className={visible ? styles.toBottomButton : styles.not_visible}>
            <ExpandMoreIcon fontSize="large" onClick={scroll}/>
        </div>
    )
}