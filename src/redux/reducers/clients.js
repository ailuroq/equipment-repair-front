import {GET_CLIENT, GET_CLIENTS} from "../actions/types";

const initialState = {
    clientData: {
        lastName: '',
        firstName: '',
        middleName: '',
        phone: ''
    },
    clientViewInfo: {
        client: {},
        clientDevices: {}
    }
}

export default function clients (state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS:
            return {
                ...state,
                clientData: action.payload
            }
        case GET_CLIENT:
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

