import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { LoginRegPage } from '../../pages/LoginRegPage/LoginRegPage'
import { UsersPage } from '../../pages/UsersPage/UsersPage'
import { HomePage } from '../../pages/HomePage/HomePage'
import { FriendsPage } from '../../pages/FriendsPage/FriendsPage'
import { MusicPage } from '../../pages/MusicPage/MusicPage'
import { NewReleasesPage } from '../../pages/NewReleasesPage/NewReleasesPage'

import {
    USERS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    USER_PROFILE_ROUTE,
    FRIENDS_ROUTE,
    MUSIC_ROUTE,
    NEW_RELEASES_ROUTE
} from './constants'

export const authRoutes = [
    {
        path: FRIENDS_ROUTE,
        Component: FriendsPage
    },
    
];

export const publicRoutes = [
    {
        path: USERS_ROUTE,
        Component: UsersPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginRegPage
    },
    {
        path: MAIN_ROUTE,
        Component: HomePage
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: MUSIC_ROUTE,
        Component: MusicPage
    },
    {
        path: NEW_RELEASES_ROUTE,
        Component: NewReleasesPage
    }
];