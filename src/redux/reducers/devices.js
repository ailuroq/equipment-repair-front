import {GET_DEVICE, GET_DEVICES} from "../actions/types";

const initialState = {
    deviceData: {}
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

        default:
            return state
    }
}

