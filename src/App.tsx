import React, {useState, useEffect} from 'react'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import {ModalWindow} from './components/ModalWindow/ModalWindow'
import {LoginForm} from './forms/LoginForm/LoginForm'
import {AppStateType} from './redux/root_reducer'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {toogleOpenModalWindow} from './redux/app_reducer'
import {getOwnUserData} from './redux/auth_reducer'


function App() {

  const dispatch = useDispatch()
  const isOpen = useSelector((state: AppStateType) => state.appReducer.toggleOpen)
  const userId = useSelector((state: AppStateType) => state.authReducer.userId)
  const [toggleOpen, setToggleOpen] = useState(false)

  useEffect(() => {
    if(isOpen === true) {
      setToggleOpen(true)
    } else {
      setToggleOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    if(userId) {
      setToggleOpen(false)
    }
    dispatch(toogleOpenModalWindow(false))
  }, [userId, dispatch])

  useEffect(() => {
    if(userId) {
      dispatch(getOwnUserData())
    }
    dispatch(getOwnUserData())
  }, [userId, dispatch])

  return (
    <div className={styles.app__wrapper}>
      <Header />
      <MainPage />
      <ModalWindow isOpen={toggleOpen}><LoginForm /></ModalWindow>
    </div>
  )
}

export default App
