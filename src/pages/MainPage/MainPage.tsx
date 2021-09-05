import React, {useEffect} from 'react'
import styles from './MainPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'
import UserCard from '../../components/UserCard/UserCard'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '../../components/Pagination/Pagination'


const MainPage = React.memo(() => {

  const users = useSelector((state: AppStateType) => state.usersReducer.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(50, 10))
  }, [users, dispatch])

  return (
    <div className={styles.mainPage__wrapper}>

      <Pagination />

      <div className={styles.root_one}>
        <Grid container spacing={3}>
          {
            users ? 
            users.map(user => <Grid item xs={6} sm={8} md={6} lg={6} xl={6} key={user.name} className={styles.root_two}> 
                                <UserCard 
                                id={user.id} 
                                name={user.name}
                                status={user.status}
                                uniqueUrlName={user.uniqueUrlName}
                                followed={user.followed}
                                />
                              </Grid>)
            : "Данные отсутствуют"
          }
        </Grid>
      </div>
    </div>
  );
})

export default MainPage