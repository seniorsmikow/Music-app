import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { usersAPI } from '../api/usersAPI'


let initialState = {
    users: [],
    totalCount: 0
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'users/GET_ALL_USERS': {
            return {
                ...state, users: action.payload, totalCount: action.payload.totalCount
                
            }
        }
        default: 
            return state
    }

}

export const actions = {
    allUsers: (payload: any) => ({type: 'users/GET_ALL_USERS', payload} as const)
}

export const getAllUsers = (): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getAllUsers()
        dispatch(actions.allUsers(response.data))
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>