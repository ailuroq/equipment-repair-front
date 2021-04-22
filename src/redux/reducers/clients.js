import {DELETE_CLIENT, FIND_CLIENT, GET_CLIENT, GET_CLIENTS, GET_POTENTIAL_DATA_TO_DELETE} from "../actions/types";

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
    },
    potentialDataToDelete: {}
}

export default function clients(state = initialState, action) {
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
        case DELETE_CLIENT:
            return {
                ...state,
                clientData: {
                    ...state.clientData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_CLIENT:
            return {
                ...state,
                clientData: action.payload
            }
        default:
            return state
    }
}

