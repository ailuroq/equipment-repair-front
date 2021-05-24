import {GET_1D_DIAGRAM, GET_2D_DIAGRAM, GET_3D_DIAGRAM} from "../actions/types";

const initialState = {
    diagram1DData: {},
    diagram2DData: {},
    diagram3DData: {},
}

export default function diagrams(state = initialState, action) {
    switch (action.type) {
        case GET_1D_DIAGRAM:
            return {
                ...state,
                diagram1DData: action.payload
            }
        case GET_2D_DIAGRAM:
            return {
                ...state,
                diagram2DData: action.payload
            }
        case GET_3D_DIAGRAM:
            return {
                ...state,
                diagram3DData: action.payload
            }
        default:
            return state
    }
}
