import {
    CREATE_POST_DIALOG_CLOSE,
    CREATE_POST_DIALOG_OPEN,
    DELETE_POSTS,
    FIND_POST,
    GET_POSTS,
    GET_POTENTIAL_POST_DATA_TO_DELETE,
    UPDATE_POST, UPDATE_POST_DIALOG_CLOSE, UPDATE_POST_DIALOG_OPEN
} from "../actions/types";

const initialState = {
    postData: {},
    potentialDataToDelete: {},
    newPostData: {},
    updateDialog: false,
    createDialog: false
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                postData: action.payload
            }
        case DELETE_POSTS:
            return {
                ...state,
                postData: {
                    ...state.postData,
                    ...action.payload
                }
            }
        case GET_POTENTIAL_POST_DATA_TO_DELETE:
            return {
                ...state,
                potentialDataToDelete: action.payload
            }
        case FIND_POST:
            return {
                ...state,
                postData: action.payload
            }
        case UPDATE_POST:
            return {
                ...state,
                postData: {
                    ...state.postData,
                    ...action.payload
                }
            }
        case UPDATE_POST_DIALOG_OPEN:
            return {
                ...state,
                updateDialog: true
            }
        case UPDATE_POST_DIALOG_CLOSE:
            return {
                ...state,
                updateDialog: false
            }
        case CREATE_POST_DIALOG_OPEN:
            return {
                ...state,
                createDialog: true
            }
        case CREATE_POST_DIALOG_CLOSE:
            return {
                ...state,
                createDialog: false
            }
        default:
            return state
    }
}
