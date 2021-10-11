import styles from './LoaderTwo.module.scss'
import MusicNoteIcon from '@material-ui/icons/MusicNote'


export const LoaderTwo = () => {
    return (
        <div className={styles.loader__root}>
            <div className={styles.loader__block_one}><MusicNoteIcon /></div>
            <div className={styles.loader__block_two}><MusicNoteIcon /></div>
            <div className={styles.loader__block_three}><MusicNoteIcon /></div>
        </div>
    )
}