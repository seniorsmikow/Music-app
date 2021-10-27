import { AppStateType } from '../root_reducer'

export const selectAuth = (state: AppStateType) => state.authReducer.isAuth