import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { EntryFormType } from '../types/auth_types'

let initialState = {
    toggleOpen: false,
    notificationCount: 0,
    notificationText: [] as Array<string>,
    formType: 'login' as EntryFormType
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/TOGGLE_OPEN': {
            return {
                ...state, toggleOpen: action.isOpen
            }
        }
        case 'app/GET_NOTIFICATION': {
            return {
                ...state, notificationCount: action.count, notificationText: [...state.notificationText, action.text]
            }
        }
        case 'app/DELETE_NOTIFICATIONS_COUNT': {
            return {
                ...state, notificationCount: 0
            }
        }
        case 'app/CLEAR_NOTIFICATION': {
            return {
                ...state, notificationCount: 0, notificationText: []
            }
        }
        case 'app/TOGGLE_FORM_TYPE': {
            return {
                ...state, formType: action.formType
            }
        }
        default: 
            return state
    }

}

export const actions = {
    toggleOpen: (isOpen: boolean) => ({type: 'app/TOGGLE_OPEN', isOpen} as const),
    notification: (count: number, text: string) => ({type: 'app/GET_NOTIFICATION', count, text} as const),
    deleteNoteCount: () => ({type: 'app/DELETE_NOTIFICATIONS_COUNT'} as const),
    clearNote: () => ({type: 'app/CLEAR_NOTIFICATION'} as const),
    changeFormType: (formType: EntryFormType) => ({type: 'app/TOGGLE_FORM_TYPE', formType} as const)
}

export const toogleOpenModalWindow = (isOpen: boolean): ThunkType => {
    return async (dispatch) => {
        await dispatch(actions.toggleOpen(isOpen))
    }
}

export const getNotification = (count: number, text: string): ThunkType => {
    return async(dispatch) => {
        await dispatch(actions.notification(count, text))
    }
}

export const deleteNotificationsCount = (): ThunkType => {
    return async(dispatch) => {
        await dispatch(actions.deleteNoteCount())
    }
}

export const clearNotifications = (): ThunkType => {
    return async(dispatch) => {
        await dispatch(actions.clearNote())
    }
}

export const toggleFormType = (type: EntryFormType): ThunkType => {
    return async(dispatch) => {
        await dispatch(actions.changeFormType(type))
    }
}

export default appReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>