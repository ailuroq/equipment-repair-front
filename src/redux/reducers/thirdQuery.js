import {GET_THIRD_QUERY_DATA} from "../actions/types";

const initialState = {
    thirdQueryData: {}
}

export default function thirdQuery (state = initialState, action) {
    switch (action.type) {
        case GET_THIRD_QUERY_DATA:
            return {
                ...state,
                thirdQueryData: action.payload
            }
        default:
            return state
    }
}
