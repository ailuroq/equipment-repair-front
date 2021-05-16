import {
    DELETE_MASTER,
    FIND_MASTER,
    GET_INSERT_MASTER_INFO,
    GET_MASTER,
    GET_MASTERS,
    GET_POTENTIAL_MASTER_DATA_TO_DELETE, GET_UPDATE_MASTER_INFO, UPDATE_MASTER
} from "../actions/types";

const initialState = {
    masterData: {},
    insertInfo: {},
    updateData: {},
    problems: {},
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
                masterData: action.payload
            }
        case GET_POTENTIAL_MASTER_DATA_TO_DELETE:
            return {
                ...state,
                problems: action.payload
            }
        case UPDATE_MASTER:
            return {
                ...state,
                masterData: action.payload
            }
        case GET_UPDATE_MASTER_INFO:
            return {
                ...state,
                updateData: action.payload
            }
        default:
            return state
    }
}
