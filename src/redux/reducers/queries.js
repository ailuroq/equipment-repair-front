import {
    GET_COUNT_MASTERS_PER_FIRMS,
    GET_COUNT_ORDERS_PER_FIRM,
    GET_DEVICES_BY_BRAND,
    GET_MASTER_ORDERS_PER_PERIOD,
    GET_MASTERS_MORE_AVG_EXP,
    GET_THE_MOST_EXPENSIVE_ORDER,
    GROUP_DEVICES_BY_COUNTRIES,
    GROUP_REPAIRS_BY_TYPE,
    LIST_OF_NOT_MADE_ORDERS
} from "../actions/types";

const initialState = {
    orderData: {},
    deviceData: {},
    firmData: {},
    repairData: {},
}

export default function queries(state = initialState, action) {
    switch (action.type) {
        case GET_MASTER_ORDERS_PER_PERIOD:
            return {
                ...state,
                orderData: action.payload
            }
        case GET_DEVICES_BY_BRAND:
            return {
                ...state,
                deviceData: action.payload
            }
        case LIST_OF_NOT_MADE_ORDERS:
            return {
                ...state,
                orderData: action.payload
        }
        case GET_COUNT_MASTERS_PER_FIRMS:
            return {
                ...state,
                firmData: action.payload
            }
        case GROUP_DEVICES_BY_COUNTRIES:
            return {
                ...state,
                deviceData: action.payload
            }
        case GROUP_REPAIRS_BY_TYPE:
            return {
                ...state,
                repairData: action.payload
            }
        case GET_COUNT_ORDERS_PER_FIRM:
            return {
                ...state,
                firmData: action.payload
            }
        case GET_THE_MOST_EXPENSIVE_ORDER:
            return {
                ...state,
                orderData: action.payload
            }
        case GET_MASTERS_MORE_AVG_EXP:
            return {
                ...state,
                masterData: action.payload
            }
        default:
            return state
    }
}
