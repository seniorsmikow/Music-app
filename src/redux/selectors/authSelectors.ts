import { AppStateType } from '../root_reducer'

export const getAuth = (state: AppStateType) => state.authReducer.isAuth