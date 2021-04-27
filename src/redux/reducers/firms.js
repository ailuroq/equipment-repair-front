import {DELETE_FIRM, GET_FIRMS, GET_POTENTIAL_FIRM_DATA_TO_DELETE} from "../actions/types";

const initialState = {
    firmData: {},
    potentialDataToDelete: {}
}

export default function firms (state = initialState, action) {
    switch (action.type) {
        case GET_FIRMS:
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
        default:
            return state
    }
}

