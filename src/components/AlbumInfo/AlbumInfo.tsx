import styles from './AlbumInfo.module.scss'

type PropsType = {
    visible: boolean
}


export const AlbumInfo: React.FC<PropsType> = ({visible}) => {

    //console.log(visible)

    
    return (
        <div className={visible ? styles.album__info_root : styles.not}>
           album info
        </div>
    )
}