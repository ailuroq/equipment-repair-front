import {
    DELETE_DEVICES, FIND_DEVICES,
    GET_DEVICE,
    GET_DEVICE_UPDATE_DATA,
    GET_DEVICES,
    GET_INSERT_DEVICE_INFO,
    GET_POTENTIAL_DEVICE_DATA_TO_DELETE
} from "../actions/types";

const initialState = {
    deviceData: {},
    insertInfo: {},
    deviceInfo: {},
    potentialDataToDelete: {}
}

export default function devices (state = initialState, action) {
    switch (action.type) {
        case GET_DEVICES:
            return {
                ...state,
                deviceData: action.payload
            }
        case GET_DEVICE:
            return {
                ...state,
                deviceInfo: action.payload
            }
        case GET_INSERT_DEVICE_INFO:
            return {
                ...state,
                insertInfo: action.payload
            }
        case GET_POTENTIAL_DEVICE_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case GET_DEVICE_UPDATE_DATA:
            return {
                ...state,
                deviceInfo: action.payload
            }
        case DELETE_DEVICES:
            return {
                ...state,
                deviceData: {
                    ...state.deviceData,
                    ...action.payload
                }
            }
        case FIND_DEVICES:
            return {
                ...state,
                deviceData: action.payload
            }
        default:
            return state
    }
}

