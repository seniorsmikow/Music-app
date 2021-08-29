
import {Action, createStore, combineReducers, applyMiddleware, compose} from 'redux'
import app_reducer from './app_reducer'
import auth_reducer from './auth_reducer'
import profile_reducer from './profile_reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

let rootReducer = combineReducers({
    appReducer: app_reducer,
    authReducer: auth_reducer,
    profileReducer: profile_reducer,
});

type RootState = typeof rootReducer
export type AppStateType = ReturnType<RootState>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.__store__ = store

export default store