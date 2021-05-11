import {
    CREATE_COUNTRY_DIALOG_CLOSE,
    CREATE_COUNTRY_DIALOG_OPEN,
    DELETE_COUNTRIES,
    FIND_COUNTRY,
    GET_COUNTRIES,
    GET_POTENTIAL_COUNTRY_DATA_TO_DELETE,
    UPDATE_COUNTRY, UPDATE_COUNTRY_DIALOG_CLOSE, UPDATE_COUNTRY_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    countryData: {},
    potentialDataToDelete: {},
    updateDialog: false,
    createDialog: false,
}

export default function countries(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countryData: action.payload
            }
        case DELETE_COUNTRIES:
            return {
                ...state,
                countryData: {
                    ...state.countryData,
                    ...action.payload,
                }
            }
        case GET_POTENTIAL_COUNTRY_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_COUNTRY:
            return {
                ...state,
                countryData: action.payload
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                countryData: {
                    ...state.countryData,
                    ...action.payload
                }
            }
        case UPDATE_COUNTRY_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_COUNTRY_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        case CREATE_COUNTRY_DIALOG_OPEN:
            return {
                ...state,
                createDialog: true
            }
        case CREATE_COUNTRY_DIALOG_CLOSE:
            return {
                ...state,
                createDialog: false
            }
        default:
            return state;
    }
}
