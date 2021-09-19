import React, {useState, useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import styles from './Pagination.module.scss'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import { changeCurrentPage, toggleShowUsersCount} from '../../redux/users_reducer'



// Later fix error: after return from profile page, disappear current page and pages


export const Pagination = () => {

    const totalUsersCount = useSelector((state: AppStateType) => state.usersReducer.totalCount)
    const currentPage = useSelector((state: AppStateType) => state.usersReducer.currentPage)
    const usersPortionShow = useSelector((state: AppStateType) => state.usersReducer.showUserCount)

    const dispatch = useDispatch()

    const [pages, setPages] = useState([1, 2, 3])
    const lastPage = Math.ceil(totalUsersCount/usersPortionShow)

    useEffect(() => {
        if(totalUsersCount < 10) {
            setPages([1])
        } else {
            setPages([1, 2, 3])
        }
    }, [totalUsersCount])

    const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {value} = event.target
        dispatch(toggleShowUsersCount(+value))
        dispatch(changeCurrentPage(1))
        if(totalUsersCount < (+value)) {
            setPages([1])
        } else {
            setPages([1, 2, 3])
        }
    }

    const selectPage = (page: number) => {
        dispatch(changeCurrentPage(page))
        if(page === lastPage) {
            if(page === 1 && pages.length === 1) {
                return
            }
            setPages([pages[2] = lastPage , pages[1] = lastPage - 1, pages[0] = lastPage - 2].reverse())
            dispatch(changeCurrentPage(lastPage))
        } 
    }

    const selectNextPage = () => {
        if(pages[2] < lastPage) {
            setPages(pages.map(page => page + 1))
        }
        dispatch(changeCurrentPage(currentPage + 1))
    }

    const selectPrevPage = () => {
        if(pages[0] >= 2) {
            setPages(pages.map(page => page - 1))
        }
        dispatch(changeCurrentPage(currentPage - 1))
    }

    const selectFirstPage = () => {
        setPages([1, 2, 3])
        dispatch(changeCurrentPage(1))
    }

    const showFirstEllipsis = () => {
        if(pages[2] > 4 ) {
            return <div>...</div>
        } return null
    }

    const showSecondEllipsis = () => {
        if(pages[2] === lastPage || pages.length === 1) {
            return null
        } return <div>...</div>
    }

    return (
        <div className={styles.pagination__root}>
            {
                totalUsersCount < 10 ? null :
                <div className={styles.pagination__select}>
                    Показывать по 
                    <select name="usersCount" onChange={handleSelectValue}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    пользователей на странице
                </div>
            }
            <ul className={styles.pagination__list}>
                <button disabled={currentPage === 1} onClick={() => selectPrevPage()}>
                    <SkipPreviousIcon />
                </button>
                {
                    pages[0] === 1
                    ? null :
                    <li onClick={() => selectFirstPage()} className={
                        currentPage === 1 ? styles.pagination__list_active : styles.pagination__list}>
                            {
                                1
                            }
                    </li>
                }
                {
                    showFirstEllipsis()
                }
                {
                    pages.map(p => <li key={p} onClick={() => selectPage(p)} className={
                        currentPage === p ? styles.pagination__list_active : styles.pagination__list
                    }>{p}</li>)
                }
                {
                    showSecondEllipsis()
                }
                {
                    pages[2] === lastPage || pages.length === 1
                    ? null :
                    <li onClick={() => selectPage(lastPage)} className={
                        currentPage === lastPage ? styles.pagination__list_active : styles.pagination__list}>
                            {
                                lastPage
                            }
                    </li>
                }
                
                <button disabled={currentPage >= lastPage} onClick={() => selectNextPage()}>
                    <SkipNextIcon />
                </button>
            </ul>
        </div>
    )
}