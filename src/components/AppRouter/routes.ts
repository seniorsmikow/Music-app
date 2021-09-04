import {ProfilePage} from '../../pages/ProfilePage/ProfilePage'
import {LoginPage} from '../../pages/LoginPage/LoginPage'
import MainPage from '../../pages/MainPage/MainPage'

import {
    PROFILE_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE
    
} from './constants'

export const authRoutes = [
    // {
    //     path: PROFILE_ROUTE,
    //     Component: ProfilePage
    // },
    
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: MainPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    }
];