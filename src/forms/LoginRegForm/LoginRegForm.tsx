import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import { loginOrRegistration } from '../../redux/auth_reducer'
import styles from './Login.module.scss'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный адрес электронной почты').required('Заполните поле email'),
  password: Yup.string()
  .min(2, 'Короткий пароль')
  .max(20, 'Слишком длинный пароль')
  .required('Заполните поле password'),
})
interface MyFormValues {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
 
 export const LoginRegForm: React.FC<{}> = () => {

   const initialValues: MyFormValues = { 
                                        email: '', 
                                        password: '', 
                                        rememberMe: false,
                                        captcha: ''
                                    }

  const dispatch = useDispatch()
  const formType: 'login' | 'registration'  = useSelector((state: AppStateType) => state.appReducer.formType)
  const captchaUrl = useSelector((state: AppStateType) => state.authReducer.captcha)

   return (
     <div className={styles.login__form_wrapper}>
       <p>Тестовые данные для входа: 
         <br />
         Email: free@samuraijs.com
         <br/>
          Password: free</p>
       <Formik
         initialValues={initialValues}
         validationSchema={SignupSchema}
         onSubmit={(values, actions) => {
           dispatch(loginOrRegistration(values.email, values.password, values.rememberMe, formType, values.captcha))
           actions.resetForm()
         }}
       > 
       {({ errors, touched }) => (
         <Form>
           <div className={styles.form__inputs}>
            <Field id="email" name="email" placeholder="Email" />
            {errors.email && touched.email ? <div className={styles.email__errors}>{errors.email}</div> : null}
            <Field id="password" name="password" type="password" autoComplete="on" placeholder="password"/>
            {errors.password && touched.password ? <div className={styles.password__errors}>{errors.password}</div> : null}
           </div>

           <div className={styles.form__remember_me}>
             <div className={styles.remember_me_text}><label htmlFor="rememberMe">Запомнить</label></div>
             <div className={styles.remember__me_checkbox}><Field id="rememberMe" name="rememberMe"  type="checkbox"/></div>
           </div>

           {
             captchaUrl ? 
              <div className={styles.captcha}>
                Введите символы
                <img src={captchaUrl} alt="captcha"/>
                <Field id="captcha" name="captcha"/>
              </div>
             : null
           }

          <button type="submit">
             {
               formType === 'login' ? 'Вход' : 'Регистрация'
             }
          </button>
         </Form> )}
       </Formik>
     </div>
   );
 };