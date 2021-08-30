import React, {useEffect} from 'react'
import styles from './MainPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'
import UserCard from '../../components/UserCard/UserCard'


const MainPage = () => {

  const users = useSelector((state: AppStateType) => state.usersReducer.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers(1, 1))
  })

  return (
    <div className={styles.mainPage__wrapper}>
      <button>next</button>
      <div>
        {users ? 
          users.map((user) => <UserCard 
                              key={user.name} 
                              id={user.id} 
                              name={user.name}
                              status={user.status}
                              uniqueUrlName={user.uniqueUrlName}
                              followed={user.followed}
                              /> )
                              : "Данные о пользователях отсутствуют" 
        }
      </div>
    </div>
  );
}

export default MainPage