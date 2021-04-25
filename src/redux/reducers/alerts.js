import {CLEAR_ALERT, ERROR_ALERT, SUCCESS_ALERT} from "../actions/types";

const initialState = {
    successAlert: false,
    errorAlert: false,
}

export default function alerts(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_ALERT:
            return {
                ...state,
                successAlert: true
            }
        case ERROR_ALERT:
            return {
                ...state,
                errorAlert: true
            }
        case CLEAR_ALERT:
            return {
                ...state,
                successAlert: false,
                errorAlert: false,
            }
        default:
            return state
    }
}
