import { AppStateType } from '../root_reducer'

export const isAuth = (state: AppStateType) => state.authReducer.isAuth

export const userId = (state: AppStateType) => state.authReducer.userId