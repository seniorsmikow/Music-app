import { InferActionsTypes, BaseThunkType } from './root_reducer'
import { profileAPI } from '../api/profileAPI'
import { profileType } from '../types/profile_types'


let initialState = {
    profile: null as profileType | null
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/GET_PROFILE': {
            return {
                ...state, profile: action.payload
                
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
        let data = await profileAPI.getUserProfile(userId)
        debugger
        dispatch(actions.getProfile(data))
    }
}

export default profileReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>