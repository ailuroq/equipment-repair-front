import {DELETE_MASTER, FIND_MASTER, GET_INSERT_MASTER_INFO, GET_MASTER, GET_MASTERS} from "../actions/types";

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
        case GET_MASTER:
            return {
                ...state,
                masterViewInfo: action.payload
            }
        case GET_INSERT_MASTER_INFO:
            return {
                ...state,
                insertInfo: action.payload
            }
        case DELETE_MASTER:
            return {
                ...state,
                masterData: {
                    ...state.masterData,
                    ...action.payload
                }
            }
        case FIND_MASTER:
            return {
                ...state,
                masterData: {
                    ...state,
                    masterData: action.payload
                }
            }
        default:
            return state
    }
}
