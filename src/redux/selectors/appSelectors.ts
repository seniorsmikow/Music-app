import { AppStateType } from '../root_reducer'

export const getNotificationsCount = (state: AppStateType) => state.appReducer.notificationCount

export const getNotificationsText = (state: AppStateType) => state.appReducer.notificationText

export const isLoading = (state: AppStateType) => state.profileReducer.isLoad

export const getFormType = (state: AppStateType) => state.appReducer.formType