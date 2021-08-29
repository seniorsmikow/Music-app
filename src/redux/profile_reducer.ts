import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { profileAPI } from '../api/profileAPI'


let initialState = {
    userId: null as number | null
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/GET_PROFILE': {
            return {
                ...state, userId: action.payload.data.userId,
                
            }
        }
        default: 
            return state
    }

}

export const actions = {
    getProfile: (payload: any) => ({type: 'profile/GET_PROFILE', payload} as const)
}

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getUserProfile(userId)
        debugger
        dispatch(actions.getProfile(response.data))
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>