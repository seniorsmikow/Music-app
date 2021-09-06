import {ProfilePage} from '../../pages/ProfilePage/ProfilePage'
import {LoginPage} from '../../pages/LoginPage/LoginPage'
import { UsersPage } from '../../pages/UsersPage/UsersPage'
import { HomePage } from '../../pages/HomePage/HomePage'

import {
    USERS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    USER_PROFILE_ROUTE
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
        Component: UsersPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: MAIN_ROUTE,
        Component: HomePage
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: ProfilePage
    }
];