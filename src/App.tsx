import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import { AppStateType } from './redux/root_reducer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getOwnUserData } from './redux/auth_reducer'
import { getNotification } from './redux/app_reducer'
import { AppRouter  } from './components/AppRouter/AppRouter'
import { ScrollToTop } from './components/Buttons/ScroollToTop/ScrollToTop'
import { ScrollToBottom } from './components/Buttons/ScrollToBottom/ScrollToBottom'


function App() {

  const dispatch = useDispatch()
  const userId = useSelector((state: AppStateType) => state.authReducer.userId)
  const notificationCount = useSelector((state: AppStateType) => state.appReducer.notificationCount)

  const welcome = () => {
    dispatch(getNotification(notificationCount + 1, `Добро пожаловать на сайт "В разработке"`))
  }

  useEffect(() => {
    let timer = setTimeout(welcome, 2000)
    return() => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if(userId) {
      dispatch(getOwnUserData())
    } 
  }, [userId, dispatch])

  return (
    <div className={styles.app__wrapper}>
      <HashRouter>
        <Header />
        <AppRouter />
        <ScrollToBottom />
        <ScrollToTop />
      </HashRouter>
    </div>
  )
}

export default App