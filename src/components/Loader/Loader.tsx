import React from 'react'
import styles from './Loader.module.scss'


export const Loader = () => {
    return (
        <div className={styles.loader__wrapper}>
            {/* Загрузка... */}
            <div className={styles.loader__animation_block}>
                <div className={styles.loader__block_one}></div>
                <div className={styles.loader__block_two}></div>
                <div className={styles.loader__block_three}></div>
                <div className={styles.loader__block_four}></div>
                <div className={styles.loader__block_five}></div>
            </div>
        </div>
    )
}