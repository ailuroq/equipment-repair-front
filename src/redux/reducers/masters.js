import {GET_INSERT_MASTER_INFO, GET_MASTERS} from "../actions/types";

const initialState = {
    masterData: {},
    insertInfo: {},
}

export default function masters(state = initialState, action) {
    switch (action.type) {
        case GET_MASTERS:
            return {
                ...state,
                masterData: action.payload
            }
        case GET_INSERT_MASTER_INFO:
            return {
                ...state,
                insertInfo: action.payload
            }
        default:
            return state
    }
}
