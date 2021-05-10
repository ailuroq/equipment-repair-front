import {
    DELETE_FIRM,
    FIND_FIRM, GET_FIRM_FOR_VIEW,
    GET_FIRMS, GET_INSERT_FIRM_DATA,
    GET_POTENTIAL_FIRM_DATA_TO_DELETE,
    GET_UPDATE_FIRM_DATA
} from "../actions/types";

const initialState = {
    firmData: {},
    potentialDataToDelete: {},
    updateFirmData: {},
    insertInfo: {}
}

export default function firms (state = initialState, action) {
    switch (action.type) {
        case GET_FIRMS:
            return {
                ...state,
                firmData: action.payload
            }
        case GET_FIRM_FOR_VIEW:
            return {
                ...state,
                firmData: action.payload
            }
        case GET_POTENTIAL_FIRM_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case DELETE_FIRM:
            return {
                ...state,
                firmData: {
                    ...state.firmData,
                    ...action.payload
                }
            }
        case GET_UPDATE_FIRM_DATA:
            return {
                ...state,
                updateFirmData: action.payload
            }
        case FIND_FIRM:
            return {
                ...state,
                firmData: action.payload
            }
        case GET_INSERT_FIRM_DATA:
            return {
                insertInfo: action.payload
            }
        default:
            return state
    }
}

