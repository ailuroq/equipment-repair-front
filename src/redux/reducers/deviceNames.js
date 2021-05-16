import {
    CREATE_DEVICE_NAME_DIALOG_CLOSE,
    CREATE_DEVICE_NAME_DIALOG_OPEN,
    DELETE_DEVICE_NAMES,
    FIND_DEVICE_NAME,
    GET_DEVICE_NAMES,
    GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE,
    UPDATE_DEVICE_NAME, UPDATE_DEVICE_NAME_DIALOG_CLOSE, UPDATE_DEVICE_NAME_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    deviceNameData: {},
    potentialDataToDelete: {},
    newDeviceNameData: {},
    updateDialog: false,
    createDialog: false
}

export default function deviceNames(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICE_NAMES:
            return {
                ...state,
                deviceNameData: action.payload
            }
        case DELETE_DEVICE_NAMES:
            return {
                ...state,
                deviceNameData: {
                    ...state.deviceNameData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_DEVICE_NAME:
            return {
                ...state,
                deviceNameData: action.payload
            }
        case UPDATE_DEVICE_NAME:
            return {
                ...state,
                deviceNameData: {
                    ...state.deviceNameData,
                    ...action.payload
                }
            }
        case UPDATE_DEVICE_NAME_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_DEVICE_NAME_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        case CREATE_DEVICE_NAME_DIALOG_OPEN:
            return {
                ...state,
                createDialog: true
            }
        case CREATE_DEVICE_NAME_DIALOG_CLOSE:
            return {
                ...state,
                createDialog: false
            }
        default:
            return state
    }
}
