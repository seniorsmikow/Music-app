
import React, { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'
import styles from './ScrollToTop.module.scss'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'


export const ScrollToTop = () => {

    const { y: pageYOffset } = useWindowScroll()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if(pageYOffset > 400) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [pageYOffset])

    const scroll = () => window.scrollTo({top: 0, behavior: "smooth"})
    
    return (
        <div className={visible ? styles.toTopButton : styles.not_visible}>
            <ExpandLessIcon   fontSize="large" onClick={scroll}/>
        </div>
    )
}