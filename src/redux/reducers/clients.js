import {GET_CLIENTS} from "../actions/types";

const initialState = {
    clientData: {
        lastName: '',
        firstName: '',
        middleName: '',
        phone: ''
    }
}

export default function profile (state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS:
            return {
                ...state,
                clientData: action.payload
            }
        default:
            return state
    }
}

