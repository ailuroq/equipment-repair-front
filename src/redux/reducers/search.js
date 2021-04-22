import {GET_ORDERS, UPDATE_SEARCH_VALUE} from "../actions/types";

const initialState = {
    searchValue: ''
}

export default function orders (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload
            }
        default:
            return state
    }
}

