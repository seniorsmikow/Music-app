import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './ProfilePage.module.scss'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import { FriendsBlock } from '../../components/FriendsBlock/FriendsBlock'
import {getUserProfile, loadProfilePhoto} from '../../redux/profile_reducer'
import { AppStateType } from '../../redux/root_reducer'
import { Formik, Form } from 'formik'


export const ProfilePage = (props: any) => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)
    const profile = useSelector((state: AppStateType) => state.profileReducer.profile)

    const propsUserId = props.match.params.userId

    const history = useHistory()

    useEffect(() => {
        if(propsUserId) {
            dispatch(getUserProfile(propsUserId))
        }
    }, [propsUserId, dispatch])

    useEffect(() => {
        if(!isAuth) {
            history.push('/')
        }
    })

    return (
        <div className={styles.profile__page_root}>
            {
                profile ? <ProfileInfo profile={profile}/> : "Loading"
            }
            <FriendsBlock />
            <Formik
                initialValues={{
                    name: '',
                    price: 0,
                    brandId: '',
                    typeId: '',
                    img: null,
                    file: '' 
                }}
                onSubmit={async (values) => {

                    const formData = new FormData()
                    // formData.append('name', values.name)
                    // formData.append('price', `${values.price}`)
                    // formData.append('img', values.file)
                    // formData.append('brandId', values.brandId)
                    // formData.append('typeId', values.typeId)
                    dispatch(loadProfilePhoto(formData))

                }}
            >
            {
                ({ errors, touched, setFieldValue, values, handleChange }) => (
                    <Form>
                        <div className={styles.profile__input}>
                            <label htmlFor="file">Выберите изображение</label>
                            <input  id="file" name="file" type="file" onChange={(event: React.SyntheticEvent<EventTarget>) => {
                                const target= event.target as HTMLInputElement;
                                const file: File = (target.files as FileList)[0]
                                setFieldValue("file", file);
                            }}/>
                        </div>
                        <button type="submit" >Создать</button>
                    </Form>
                )
            }
            </Formik>
        </div>
    )
}