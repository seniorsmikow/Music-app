import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './SearchForm.module.scss'
import { getMusicSearchResponse } from '../../redux/music_search'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router'

export const MusicSearchForm = () => {
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const [inputValue, setInputValue] = useState('')
    const dispatch =  useDispatch()
    const history = useHistory()

    const selectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setType(value)
    }

    const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value
        setSearch(value)
        setInputValue(value)
    }

    const find = (search: string, type: string, path: string = '/musicFind') => {
            dispatch(getMusicSearchResponse(search, type))
            setInputValue('')
            history.push(path)
    }

    return (
        <div className={styles.root}>
            <input placeholder="Поиск..." value={inputValue} onChange={(e) => handleChangeInput(e)}>
            </input>
            <select name="search" onChange={selectType}>
                <option value=""></option>
                <option value="album">альбом</option>
                <option value="artist">артист</option>
                <option value="track">трек</option>
            </select>
            <div className={styles.search__icon}>
                <SearchIcon onClick={() => find(search, type)} className={styles.header__search_icon} fontSize="large"/>
            </div>
        </div>
    )
}