import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { LoginRegPage } from '../../pages/LoginRegPage/LoginRegPage'
import { UsersPage } from '../../pages/UsersPage/UsersPage'
import { HomePage } from '../../pages/HomePage/HomePage'
import { FriendsPage } from '../../pages/FriendsPage/FriendsPage'
import { NewReleasesPage } from '../../pages/NewReleasesPage/NewReleasesPage'
import { MusicFindPage } from '../../pages/MusicFindPage/MusicFindPage'
import { ArtistPage } from '../../pages/ArtistPage/ArtistPage'
import { AlbumPage } from '../../pages/AlbumPage/AlbumPage'

import {
    USERS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    USER_PROFILE_ROUTE,
    FRIENDS_ROUTE,
    NEW_RELEASES_ROUTE,
    MUSIC_FIND_ROUTE,
    ARTIST_PAGE_ROUTE,
    MUSIC_ALBUM_PAGE
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
        path: NEW_RELEASES_ROUTE,
        Component: NewReleasesPage
    },
    {
        path: MUSIC_FIND_ROUTE,
        Component: MusicFindPage
    },
    {
        path: ARTIST_PAGE_ROUTE,
        Component: ArtistPage
    },
    {
        path: MUSIC_ALBUM_PAGE,
        Component: AlbumPage
    }
];