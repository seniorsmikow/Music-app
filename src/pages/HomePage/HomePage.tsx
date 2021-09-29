import React from 'react'
import { WaitGhost } from '../../components/WaitGhost/WaitGhost'
import styles from './HomePage.module.scss'
import network from '../../img/smm-prodvizhenie.png'
import { Slider } from '../../components/Slider/Slider'


export const HomePage = () => {
    return (
        <div className={styles.home__page_root}>
            <Slider />
            <div className={styles.home__animation_block}>
                <WaitGhost /> 
            </div>
            <div className={styles.home__title}>
                <h1>"В разработке"</h1>
                <h3>Социальная сеть для разработчиков</h3>
            </div>
            <div className={styles.home__main}>
                <div className={styles.home__schema_img}>
                    <img src={network} alt="social network"/>
                </div>
                <p>

                    Этот проект создан на базе API 
                    <a href="https://social-network.samuraijs.com/docs">"SamuraiJS Social Network"</a>.
                    В далёком 2015 году разработчик из Беларуси создаёт youtube канал
                    <a href="https://www.youtube.com/c/ITKAMASUTRA/featured">IT-KAMASUTRA </a>,
                    где учит людей программированию.
                    <span>
                        Канал про программирование на JavaScript. Секреты и инсайды, как стать программистом абсолютно любому человеку. 
                    </span>
                </p>
            </div>
            <div className={styles.home__youtube_video}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/RKrkQxFYJ1c" title="YouTube video player"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </div>
        </div>
    )
}