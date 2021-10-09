import React from 'react'
import { useDispatch } from 'react-redux'
import { getMusic } from '../../redux/music_reducer'
import styles from './MusicPage.module.scss'


export const MusicPage = () => {

    const dispatch = useDispatch()

    const letTheMusicPlay = () => {
        dispatch(getMusic())
    }

    return (
        <div className={styles.music__page_root}>
            Music Page
            <button onClick={() => letTheMusicPlay()}>
                get music
            </button>
        </div>
    )
}