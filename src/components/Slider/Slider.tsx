import { useState } from 'react'
import classes from './Slider.module.scss'
import ImgOne from '../../img/adele.jpg'
import ImgTwo from '../../img/dua_lipa.jpg'
import ImgThree from '../../img/kanye_west.jpg'
import ImgFour from '../../img/hans.jpg'
import ImgFive from '../../img/metallica.jpg'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


export const Slider = () => {

    let imgArray = [
        ImgOne, ImgTwo, ImgThree, ImgFour, ImgFive
    ];

    const [posX, setPosX] = useState(0);
    const [isFinishNext, setIsFinishNext] = useState(false);
    const [isFinishPrev, setIsFinishPrev] = useState(false);

    const toPrev = () => {
        if(posX === 0) {
            setIsFinishPrev(true);
            setIsFinishNext(false);
        } else {
            setPosX(posX + 100);
        }
    };

    const toNext = () => {
        if(posX === -100 * (imgArray.length -1)) {
            setIsFinishNext(true);
        } else {
            setPosX(posX - 100);
            setIsFinishPrev(false);
        }
    };

    return (
        <div className={classes.main}>
            {
                imgArray.map((elem, index) => {
                    return <div key={index} className={classes.slider__img_wrapper} style={{transform: `translateX(${posX}%)`}}>
                        <img src={elem} alt="slider-img"/>
                    </div>
                })
            }
            <button className={classes.prev__button} onClick={toPrev} disabled={isFinishPrev}>
                <ChevronLeftIcon fontSize="large"/>
            </button>
            <button className={classes.next__button} onClick={toNext} disabled={isFinishNext}>
                <ChevronRightIcon fontSize="large"/>
            </button>
        </div>
    )
}