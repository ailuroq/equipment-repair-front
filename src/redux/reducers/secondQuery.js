import {GET_SECOND_QUERY_DATA} from "../actions/types";

const initialState = {
    secondQueryData: {}
}

export default function secondQuery (state = initialState, action) {
    switch (action.type) {
        case GET_SECOND_QUERY_DATA:
            return {
                ...state,
                secondQueryData: action.payload
            }
        default:
            return state
    }
}
