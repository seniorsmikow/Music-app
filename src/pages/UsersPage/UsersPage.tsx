import React, {useEffect} from 'react'
import styles from './UsersPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'
import UserCard from '../../components/UserCard/UserCard'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '../../components/Pagination/Pagination'
import { WaitGhost } from '../../components/WaitGhost/WaitGhost'
import { SearchUsers } from '../../forms/SearchUsers/SearchUsers'


export const UsersPage = React.memo(() => {

  const users = useSelector((state: AppStateType) => state.usersReducer.users)
  const showUsersCount = useSelector((state: AppStateType) => state.usersReducer.showUserCount)
  const pageNumber = useSelector((state: AppStateType) => state.usersReducer.currentPage)
  const searchTerm = useSelector((state: AppStateType) => state.usersReducer.term)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(showUsersCount, pageNumber, searchTerm))
  }, [dispatch, showUsersCount, pageNumber, searchTerm])

  return (
    <div className={styles.mainPage__wrapper}>

      <SearchUsers />

      <Pagination />

      <div className={styles.root_one}>
        <Grid container spacing={3}>
          {
            users ? 
            users.map(user => <Grid item xs={6} sm={8} md={6} lg={6} xl={6} key={user.id} className={styles.root_two}> 
                                <UserCard 
                                  id={user.id} 
                                  name={user.name}
                                  status={user.status}
                                  uniqueUrlName={user.uniqueUrlName}
                                  followed={user.followed}
                                  photo={user.photos.large}
                                />
                              </Grid>)
            : <WaitGhost />
          }
        </Grid>
      </div>
    </div>
  );
})