import {
    DELETE_ORDERS, FIND_ORDERS,
    GET_INSERT_ORDER_INFO,
    GET_ORDER,
    GET_ORDER_UPDATE_DATA,
    GET_ORDERS,
    GET_POTENTIAL_ORDER_DATA_TO_DELETE, GET_UPDATE_INFO_ORDER
} from "../actions/types";

const initialState = {
    orderData: {},
    insertInfo: {},
    potentialDataToDelete: {},
    updateInfo: {}
}

export default function orders (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orderData: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                orderData: action.payload
            }
        case GET_INSERT_ORDER_INFO:
            return {
                ...state,
                insertInfo: action.payload
            }
        case GET_ORDER_UPDATE_DATA:
            return {
                ...state,
            }
        case GET_POTENTIAL_ORDER_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case DELETE_ORDERS:
            return {
                ...state,
                orderData: {
                    ...state.orderData,
                    ...action.payload
                }
            }
        case GET_UPDATE_INFO_ORDER:
            return {
                ...state,
                updateInfo: action.payload
            }
        case FIND_ORDERS:
            return {
                ...state,
                orderData: action.payload
            }
        default:
            return state
    }
}

