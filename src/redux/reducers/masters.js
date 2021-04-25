import {GET_MASTERS} from "../actions/types";

const initialState = {
    masterData: {}
}

export default function masters(state = initialState, action) {
    switch (action.type) {
        case GET_MASTERS:
            return {
                ...state,
                masterData: action.payload
            }
        default:
            return state
    }
}
