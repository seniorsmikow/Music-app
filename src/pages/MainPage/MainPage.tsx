import React from 'react'
import styles from './MainPage.module.scss'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import UserCard from '../../components/UserCard/UserCard'


const MainPage = () => {
  return (
    <div className={styles.mainPage__wrapper}>
      <ProfileInfo />
      <UserCard />
    </div>
  );
}

export default MainPage