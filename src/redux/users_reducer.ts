import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { usersAPI } from '../api/usersAPI'
import {UserType} from '../types/users_types'


let initialState = {
    users: [] as Array<UserType>,
    totalCount: 0,
    showUserCount: 10,
    pageNumber: 1,
    currentPage: 1,
    pages: [1, 2, 3, 4, 5] as Array<number>
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
                ...state, pageNumber: action.page
            }
        }
        case 'users/SELECT_PAGE': {
            return {
                ...state, pageNumber: action.page
            }
        }
        case 'users/CHANGE_NUMBERS_OF_PAGES': {
            return {
                ...state, pages: action.array
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
    changePage: (page: number) => ({type: 'users/SELECT_PAGE', page} as const),
    changeArrayPages: (array: number[]) => ({type: 'users/CHANGE_NUMBERS_OF_PAGES', array} as const),
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

export const toNextPage = (pages: number[], page: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.changePage(page + 1))
        dispatch(actions.changeArrayPages(pages.map(page => page + 1)))
    }
}

export const toPrevPage = (pages: number[], page: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.changePage(page - 1))
        dispatch(actions.changeArrayPages(pages.map(page => page - 1)))
    }
}

export const isPageFinish = (pages: number[], lastPage: number): ThunkType => {
    return async(dispatch) => {
        dispatch(actions.changeArrayPages([pages[4] = lastPage - 1, pages[3] = lastPage -2, pages[2] = lastPage - 3, pages[1] = lastPage -4, pages[0] = lastPage - 5].reverse()))
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>