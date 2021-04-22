import {GET_ORDERS} from "../actions/types";

const initialState = {
    firmData: {}
}

export default function orders (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orderData: action.payload
            }
        default:
            return state
    }
}

