import {GET_SECOND_QUERY_DATA, GET_SECOND_QUERY_DATA2} from "../actions/types";

const initialState = {
    secondQueryData: {},
    secondQueryData2: {}
}

export default function secondQuery (state = initialState, action) {
    switch (action.type) {
        case GET_SECOND_QUERY_DATA:
            return {
                ...state,
                secondQueryData: action.payload
            }
        case GET_SECOND_QUERY_DATA2:
            return {
                ...state,
                secondQueryData2: action.payload
            }
        default:
            return state
    }
}
