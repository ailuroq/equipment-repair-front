import {GET_MASTER_ORDERS_PER_PERIOD} from "../actions/types";

const initialState = {
    orderData: {},
}

export default function queries(state = initialState, action) {
    switch (action.type) {
        case GET_MASTER_ORDERS_PER_PERIOD:
            return {
                ...state,
                orderData: action.payload
            }
        default:
            return state
    }
}
