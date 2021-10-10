import styles from './WaitGhost.module.scss'


export const GhostAnimation = () => {
    return (
        <div className={styles.main}>
            <div className={styles.ghost__body}>
                <div className={styles.ghost__hands}>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.ghost__face}>
                    <div className={styles.ghost__eyes}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.ghost_mouth}></div>
                </div>
                <div className={styles.ghost_feet}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {/* <div className={styles.text}>Hello!</div> */} 
        </div>
    )
}