import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import styles from './Pagination.module.scss'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'


export const Pagination = () => {

    const totalUsersCount = useSelector((state: AppStateType) => state.usersReducer.totalCount)
    const [usersPortionShow, setUsersPortionShow] = useState(10)
    const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const pagesCount = Math.ceil(totalUsersCount / usersPortionShow)
    // for(let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }
    let shortPages: Array<number> = []
    let lastPage: number = 1


    // const letShowPages = () => {
    //     if(pages.length > 10) {
    //         for(let i = 1; i <= 10; i++) {
    //             shortPages.push(i)
    //         }
    //         return shortPages
    //     }
    //     return pages
    // }

    const letShowFinalPage = () => {
        return lastPage = pages[pages.length - 1]
    }

    

    return (
        <div className={styles.pagination__root}>
            <div>
                Показывать по 
                <select name="usersCount">
                    <option value="usersCount10">10</option>
                    <option value="usersCount10">20</option>
                    <option value="usersCount10">50</option>
                </select>
                пользователей на странице
            </div>
            <ul className={styles.pagination__list}>
                <SkipPreviousIcon />
                {
                    //letShowPages().map((page: number) => <li>{page}</li>) 
                    pages.map(page => <li key={page}>{page}</li>)
                }
                <div>...</div>
                {
                    <li>{letShowFinalPage()}</li>
                }
                <SkipNextIcon />
            </ul>
        </div>
    )
}
