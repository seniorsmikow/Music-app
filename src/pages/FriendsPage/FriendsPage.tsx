import React, {useEffect} from 'react'
import styles from './FriendsPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'
import UserCard from '../../components/UserCard/UserCard'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '../../components/Pagination/Pagination'
import { SearchUsers } from '../../forms/SearchUsers/SearchUsers'
import { Loader } from '../../components/Loader/Loader'


export const FriendsPage = React.memo(() => {

    const users = useSelector((state: AppStateType) => state.usersReducer.users)
    const showUsersCount = useSelector((state: AppStateType) => state.usersReducer.showUserCount)
    const pageNumber = useSelector((state: AppStateType) => state.usersReducer.currentPage)
    const searchTerm = useSelector((state: AppStateType) => state.usersReducer.term)
    const totalUsersCount = useSelector((state: AppStateType) => state.usersReducer.totalCount)
    const isLoading = useSelector((state: AppStateType) => state.usersReducer.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getAllUsers(10, 1, '', true))
    }, [dispatch])

    useEffect(() => {
    dispatch(getAllUsers(showUsersCount, pageNumber, searchTerm, true))
    }, [dispatch, showUsersCount, pageNumber, searchTerm])

    return (
    <div className={styles.usersPage__wrapper}>

        Friends

        <SearchUsers />

        <Pagination />

        {
        totalUsersCount === 0 ? <div className={styles.users__page_text}>Пользователи не найдены</div> : null
        }

        <div className={styles.users__page_grid}>
        <Grid container spacing={3}>
            { 
            isLoading ? <Loader /> :
            users.map(user => <Grid item xs={6} sm={8} md={6} lg={6} xl={6} key={user.id} className={styles.users__card_wrapper}> 
                                <UserCard 
                                    id={user.id} 
                                    name={user.name}
                                    status={user.status}
                                    uniqueUrlName={user.uniqueUrlName}
                                    followed={user.followed}
                                    photo={user.photos.large}
                                />
                                </Grid>)
            }
        </Grid>
        </div>
    </div>
    );
})