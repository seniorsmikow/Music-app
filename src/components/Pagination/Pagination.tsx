import React  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import styles from './Pagination.module.scss'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import {toggleShowUsersCount, changeCurrentPage} from '../../redux/users_reducer'
import { toNextPage, toPrevPage, isPageFinish } from '../../redux/users_reducer'


export const Pagination = () => {

    const dispatch = useDispatch()
    const pageNumber = useSelector((state: AppStateType) => state.usersReducer.pageNumber)
    const pages = useSelector((state: AppStateType) => state.usersReducer.pages)
    const usersPortion = useSelector((state: AppStateType) => state.usersReducer.showUserCount)
    const totalUsersCount = useSelector((state: AppStateType) => state.usersReducer.totalCount)
    const lastPage = Math.round(totalUsersCount/usersPortion)
    


    const handleChangeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {value} = event.target
        dispatch(toggleShowUsersCount(+value))
    }

    const selectPage = (page: number) => {
        if(page === lastPage) {
            dispatch(isPageFinish(pages, lastPage))
        }
        dispatch(changeCurrentPage(page))
    }
    const selectNextPage = (pages: number[], page: number) => {
        if(pageNumber !== lastPage) {
            dispatch(toNextPage(pages, pageNumber))
        }
    }

    const selectPrevPage = (pages: number[], page: number) => {
        dispatch(toPrevPage(pages, pageNumber))
    }

    const showEllipsis = () => {
        if(pageNumber !== lastPage) {
            return <div>...</div>
        } else {
            return null
        }
    }

    return (
        <div className={styles.pagination__root}>
            <div>
                Показывать по 
                <select name="usersCount" onChange={handleChangeSelectValue}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">50</option>
                </select>
                пользователей на странице
            </div>
            <ul className={styles.pagination__list}>
                <button disabled={pages[0] <= 1} onClick={() => selectPrevPage(pages, pageNumber)}>
                    <SkipPreviousIcon />
                </button>
                {
                    pages.map(p => <li key={p} onClick={() => selectPage(p)} className={
                        pageNumber === p ? styles.pagination__list_active : styles.pagination__list
                    }>{p}</li>)
                }
                {
                    showEllipsis()
                }
                <li onClick={() => selectPage(lastPage)} className={
                        pageNumber === lastPage ? styles.pagination__list_active : styles.pagination__list
                    }>{lastPage}</li>
                <button disabled={pageNumber >= lastPage} onClick={() => selectNextPage(pages, pageNumber)}>
                    <SkipNextIcon />
                </button>
            </ul>
        </div>
    )
}
