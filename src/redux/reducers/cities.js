import {
    DELETE_CITIES,
    FIND_CITY,
    GET_CITIES,
    GET_POTENTIAL_CITY_DATA_TO_DELETE, UPDATE_BRAND_DIALOG_CLOSE,
    UPDATE_CITY,
    UPDATE_CITY_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    cityData: {},
    potentialDataToDelete: {},
    updateDialog: false
}

export default function cities(state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                cityData: action.payload
            }
        case DELETE_CITIES:
            return {
                ...state,
                cityData: {
                    ...state.cityData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_CITY_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_CITY:
            return {
                ...state,
                cityData: action.payload
            }
        case UPDATE_CITY:
            return {
                ...state,
                cityData: {
                    ...state.cityData,
                    ...action.payload
                }
            }
        case UPDATE_CITY_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_BRAND_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        default:
            return state
    }
}
