import React, {useEffect} from 'react'
import styles from './MainPage.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { getAllUsers } from '../../redux/users_reducer'


const MainPage = () => {

  const users = useSelector((state: AppStateType) => state.usersReducer.users)
  console.log(users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  })

  return (
    <div className={styles.mainPage__wrapper}>
      Main Page
      
    </div>
  );
}

export default MainPage