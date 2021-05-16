import {FIND_REPAIRS, GET_INSERT_REPAIR_INFO, GET_REPAIRS, GET_UPDATE_REPAIR_DATA} from "../actions/types";

const initialState = {
    repairData: {},
    updateData: {},
}

export default function repairs(state = initialState, action) {
    switch (action.type) {
        case GET_REPAIRS:
            return {
                ...state,
                repairData: action.payload
            }
        case GET_INSERT_REPAIR_INFO:
            return {
                ...state,
                repairData: action.payload
            }
        case FIND_REPAIRS:
            return {
                ...state,
                repairData: action.payload
            }
        case GET_UPDATE_REPAIR_DATA:
            return {
                ...state,
                updateData: action.payload
            }
        default:
            return state
    }
}
