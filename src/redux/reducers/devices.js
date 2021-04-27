import {GET_DEVICE, GET_DEVICES, GET_INSERT_DEVICE_INFO} from "../actions/types";

const initialState = {
    deviceData: {},
    insertInfo: {},
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
                clientViewInfo: {
                    client: action.payload.client,
                    clientDevices: action.payload.clientDevices
                }
            }
        case GET_INSERT_DEVICE_INFO:
            return {
                ...state,
                insertInfo: action.payload
            }

        default:
            return state
    }
}

