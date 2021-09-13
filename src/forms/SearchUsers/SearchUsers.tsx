import React, { useState } from 'react'
import { findUsers } from '../../redux/users_reducer'
import { useDispatch } from 'react-redux'
import styles from './SearchUsers.module.scss'


export const SearchUsers = () => {

    const [search, setSearch] = useState('')
    const dispatch =  useDispatch()

    const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
        let {value} = event.currentTarget
        setSearch(value)
    }

    const find = (search: string) => {
        dispatch(findUsers(search))
    }

    return (
        <div className={styles.root}>
            <input placeholder="Search user..." onChange={(e) => handleChangeInput(e)}></input>
            <button onClick={() => find(search)}>search</button>
        </div>
    )
}