import {
    CREATE_WORK_DIALOG_CLOSE,
    CREATE_WORK_DIALOG_OPEN,
    DELETE_WORKS,
    FIND_WORK,
    GET_WORKS,
    GET_POTENTIAL_WORK_DATA_TO_DELETE,
    UPDATE_WORK, UPDATE_WORK_DIALOG_CLOSE, UPDATE_WORK_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    workData: {},
    potentialDataToDelete: {},
    newWorkData: {},
    updateDialog: false,
    createDialog: false
}

export default function works(state = initialState, action) {
    switch (action.type) {
        case GET_WORKS:
            return {
                ...state,
                workData: action.payload
            }
        case DELETE_WORKS:
            return {
                ...state,
                workData: {
                    ...state.workData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_WORK_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_WORK:
            return {
                ...state,
                workData: action.payload
            }
        case UPDATE_WORK:
            return {
                ...state,
                workData: {
                    ...state.workData,
                    ...action.payload
                }
            }
        case UPDATE_WORK_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_WORK_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        case CREATE_WORK_DIALOG_OPEN:
            return {
                ...state,
                createDialog: true
            }
        case CREATE_WORK_DIALOG_CLOSE:
            return {
                ...state,
                createDialog: false
            }
        default:
            return state
    }
}
