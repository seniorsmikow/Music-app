import { AppStateType } from '../root_reducer'

export const isUserAuth = (state: AppStateType) => state.authReducer.isAuth

export const getUserId = (state: AppStateType) => state.authReducer.userId

export const fetchError = (state: AppStateType) => state.authReducer.error

export const getRegMessage = (state: AppStateType) => state.authReducer.registrationMessage

export const getLoading = (state: AppStateType) => state.authReducer.isLoading