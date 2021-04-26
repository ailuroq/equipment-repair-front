import {GET_REPAIRS} from "../actions/types";

const initialState = {
    repairData: {}
}

export default function repairs(state = initialState, action) {
    switch (action.type) {
        case GET_REPAIRS:
            return {
                ...state,
                repairData: action.payload
            }
        default:
            return state
    }
}
