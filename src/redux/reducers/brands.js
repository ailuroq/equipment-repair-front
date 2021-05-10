import {
    CREATE_BRAND_DIALOG_CLOSE,
    CREATE_BRAND_DIALOG_OPEN,
    DELETE_BRANDS,
    FIND_BRAND,
    GET_BRANDS,
    GET_POTENTIAL_BRAND_DATA_TO_DELETE,
    UPDATE_BRAND, UPDATE_BRAND_DIALOG_CHANGE, UPDATE_BRAND_DIALOG_CLOSE, UPDATE_BRAND_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    brandData: {},
    potentialDataToDelete: {},
    newBrandData: {},
    updateDialog: false,
    createDialog: false
}

export default function brands(state = initialState, action) {
    switch (action.type) {
        case GET_BRANDS:
            return {
                ...state,
                brandData: action.payload
            }
        case DELETE_BRANDS:
            return {
                ...state,
                brandData: {
                    ...state.brandData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_BRAND_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_BRAND:
            return {
                ...state,
                brandData: action.payload
            }
        case UPDATE_BRAND:
            return {
                ...state,
                brandData: {
                    ...state.brandData,
                    ...action.payload
                }
            }
        case UPDATE_BRAND_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_BRAND_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        case CREATE_BRAND_DIALOG_OPEN:
            return {
                ...state,
                createDialog: true
            }
        case CREATE_BRAND_DIALOG_CLOSE:
            return {
                ...state,
                createDialog: false
            }
        default:
            return state
    }
}
