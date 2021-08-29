import { InferActionsTypes, BaseThunkType } from './root_reducer'

let initialState = {
    toggleOpen: false,
}
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/TOGGLE_OPEN': {
            return {
                ...state, toggleOpen: action.isOpen
            }
        }
        default: 
            return state
    }

}

export const actions = {
    toggleOpen: (isOpen: boolean) => ({type: 'app/TOGGLE_OPEN', isOpen} as const)
}

export const toogleOpenModalWindow = (isOpen: boolean): ThunkType => {
    return async (dispatch) => {
        await dispatch(actions.toggleOpen(isOpen))
    }
}

export default appReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>