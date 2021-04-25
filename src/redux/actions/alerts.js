import {CLEAR_ALERT, ERROR_ALERT, SUCCESS_ALERT} from "./types";

export const successAlert = () => ({
    type: SUCCESS_ALERT
})

export const errorAlert = () => ({
    type: ERROR_ALERT
})

export const clearAlert = () => ({
    type: CLEAR_ALERT
})
