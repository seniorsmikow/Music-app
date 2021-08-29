import {ProfilePage} from '../../pages/ProfilePage/ProfilePage'
import MainPage from '../../pages/MainPage/MainPage'

import {
    PROFILE_ROUTE,
    HOME_ROUTE
    
} from './constants'

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: MainPage
    },
];