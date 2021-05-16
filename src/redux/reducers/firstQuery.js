import {
    FIRST_QUERY_DATA,
    GET_FIRST_QUERY_DATA,
    GET_FIRST_QUERY_DATA2, GET_FIRST_QUERY_INFO,
} from "../actions/types";

const initialState = {
    queryData: {},
    firstQueryData2: {},
    queryInfo: {}
}

export default function firstQuery (state = initialState, action) {
    switch (action.type) {
        case FIRST_QUERY_DATA:
            return {
                ...state,
                queryData: action.payload
            }
        case GET_FIRST_QUERY_INFO:
            return {
                ...state,
                queryInfo: action.payload
            }
        default:
            return state
    }
}
