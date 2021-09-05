import {ProfilePage} from '../../pages/ProfilePage/ProfilePage'
import {LoginPage} from '../../pages/LoginPage/LoginPage'
import MainPage from '../../pages/MainPage/MainPage'
import { HomePage } from '../../pages/HomePage/NewsPage'

import {
    PROFILE_ROUTE,
    USERS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE
} from './constants'

export const authRoutes = [
    // {
    //     path: PROFILE_ROUTE,
    //     Component: ProfilePage
    // },
    
];

export const publicRoutes = [
    {
        path: USERS_ROUTE,
        Component: MainPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: MAIN_ROUTE,
        Component: HomePage
    }
];