import React, {useEffect} from 'react'
import styles from './MainPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'
import UserCard from '../../components/UserCard/UserCard'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
)


const MainPage = () => {

  const classes = useStyles()

  const users = useSelector((state: AppStateType) => state.usersReducer.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(1, 1))
  })

  return (
    <div className={styles.mainPage__wrapper}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {
            users ? 
            users.map(user => <Grid item xs={12} sm={6} md={4} lg={3} xl={6} key={user.name} > 
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
    
    // <div className={styles.mainPage__wrapper}>
    //   <button onClick={() => dispatch(getAllUsers(1, 2))}>next</button>
    //   <div>
    //     {users ? 
    //       users.map((user) => <UserCard 
    //                           key={user.name} 
    //                           id={user.id} 
    //                           name={user.name}
    //                           status={user.status}
    //                           uniqueUrlName={user.uniqueUrlName}
    //                           followed={user.followed}
    //                           /> )
    //                           : "Данные о пользователях отсутствуют" 
    //     }
    //   </div>
    // </div>
  );
}

export default MainPage