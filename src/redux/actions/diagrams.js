import {GET_1D_DIAGRAM, GET_2D_DIAGRAM, GET_3D_DIAGRAM} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _get1DDiagram = data => ({
    type: GET_1D_DIAGRAM,
    payload: data
})

export const get1DDiagram = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'diagrams/1d')
            .then(result => {
                dispatch(_get1DDiagram(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _get2DDiagram = data => ({
    type: GET_2D_DIAGRAM,
    payload: data
})

export const get2DDiagram = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'diagrams/2d')
            .then(result => {
                dispatch(_get2DDiagram(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _get3DDiagram = data => ({
    type: GET_3D_DIAGRAM,
    payload: data
})

export const get3DDiagram = (cityId) => {
    return dispatch => {
        return axios
            .get(API_URL + 'diagrams/3d?cityId=' + cityId)
            .then(result => {
                dispatch(_get3DDiagram(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
