import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { usersAPI } from '../api/usersAPI'
import {UserType} from '../types/users_types'


let initialState = {
    users: [] as Array<UserType>,
    totalCount: 0,
    showUserCount: 10,
    currentPage: 1,
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'users/GET_ALL_USERS': {
            return {
                ...state, users: action.payload
                
            }
        }
        case 'users/GET_TOTAL_COUNT': {
            return {
                ...state, totalCount: action.totalCount
            }
        }
        case 'users/SET_USERS_COUNT': {
            return {
                ...state, showUserCount: action.count
            }
        }
        case 'users/SET_CURRENT_PAGE': {
            return {
                ...state, currentPage: action.page
            }
        }
        default: 
            return state
    }

}

export const actions = {
    allUsers: (payload: Array<UserType>) => ({type: 'users/GET_ALL_USERS', payload} as const),
    getUsersTotalCount: (totalCount: number) => ({type: 'users/GET_TOTAL_COUNT', totalCount} as const),
    setShowUsersCount: (count: number) => ({type: 'users/SET_USERS_COUNT', count} as const),
    setPageNumber: (page: number) => ({type: 'users/SET_CURRENT_PAGE', page} as const),
}

export const getAllUsers = (count: number, page: number): ThunkType => {
    return async (dispatch) => {
        let data = await usersAPI.getAllUsers(count, page)

        dispatch(actions.allUsers(data.items))
        dispatch(actions.getUsersTotalCount(data.totalCount))
    }
}

export const toggleShowUsersCount = (count: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.setShowUsersCount(count))
    }
}

export const changeCurrentPage = (page: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.setPageNumber(page))
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>