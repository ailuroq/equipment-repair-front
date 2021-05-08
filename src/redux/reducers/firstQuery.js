import {
    GET_FIRST_QUERY_DATA,
    GET_FIRST_QUERY_DATA2,
} from "../actions/types";

const initialState = {
    firstQueryData: {},
    firstQueryData2: {}
}

export default function firstQuery (state = initialState, action) {
    switch (action.type) {
        case GET_FIRST_QUERY_DATA:
            return {
                ...state,
                firstQueryData: action.payload
            }
        case GET_FIRST_QUERY_DATA2:
            return {
                ...state,
                firstQueryData2: action.payload
            }
        default:
            return state
    }
}
