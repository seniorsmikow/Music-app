import React, {useEffect} from 'react'
import {HashRouter} from 'react-router-dom'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import {AppStateType} from './redux/root_reducer'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {getOwnUserData} from './redux/auth_reducer'
import {AppRouter} from './components/AppRouter/AppRouter'


function App() {

  const dispatch = useDispatch()
  const userId = useSelector((state: AppStateType) => state.authReducer.userId)

  useEffect(() => {
    if(userId) {
      dispatch(getOwnUserData())
    }
    dispatch(getOwnUserData())
  }, [userId, dispatch])

  return (
    <div className={styles.app__wrapper}>
      <HashRouter>
        <Header />
        <AppRouter />
      </HashRouter>
    </div>
  )
}

export default App
