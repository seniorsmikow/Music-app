import { AppStateType } from '../root_reducer'

export const getNotificationsCount = (state: AppStateType) => state.appReducer.notificationCount

export const getNotificationsText = (state: AppStateType) => state.appReducer.notificationText