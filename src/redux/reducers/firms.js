import {GET_DEVICE, GET_DEVICES} from "../actions/types";

const initialState = {
    firmData: {}
}

export default function firms (state = initialState, action) {
    switch (action.type) {
        case GET_DEVICES:
            return {
                ...state,
                firmData: action.payload
            }
        default:
            return state
    }
}

