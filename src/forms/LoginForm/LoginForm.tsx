import * as React from 'react'
import {
    Formik,
    Form,
    Field,
} from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth_reducer'
import styles from './Login.module.scss'
 
    interface MyFormValues {
        email: string
        password: string
        rememberMe: boolean
    }
 
 export const LoginForm: React.FC<{}> = () => {

   const initialValues: MyFormValues = { 
                                        email: '', 
                                        password: '', 
                                        rememberMe: false 
                                    }

  const dispatch = useDispatch()

   return (
     <div className={styles.login__form_wrapper}>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           dispatch(login(values.email, values.password, values.rememberMe))
         }}
       >
         <Form>
           <div className={styles.form__inputs}>
            <Field id="email" name="email" placeholder="Email" />
            <Field id="password" name="password" type="password" autoComplete="on" placeholder="password"/>
           </div>

           <div className={styles.form__remember_me}>
            <label htmlFor="rememberMe">Запомнить</label>
            <Field id="rememberMe" name="rememberMe"  type="checkbox"/>
           </div>

           <button type="submit">вход</button>
         </Form>
       </Formik>
     </div>
   );
 };