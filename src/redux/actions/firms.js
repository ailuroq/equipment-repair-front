import axios from "axios";
import {DELETE_CLIENT, GET_DEVICES, GET_FIRMS, GET_POTENTIAL_DATA_TO_DELETE} from "./types";
import {API_URL} from "../../constants/urlConstants";
import {errorAlert, successAlert} from "./alerts";

const _getFirms = (firmData) => ({
    type: GET_FIRMS,
    payload: firmData
})

export const getFirms = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'firms/')
            .then(result => {
                dispatch(_getFirms(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDataToDelete = (potentialDataToDelete) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE,
    payload: potentialDataToDelete
})

export const getPotentialDataToDelete = (firmId) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'firms/problems/' + firmId)
            .then(result => {
                dispatch(_getPotentialDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteFirm = (firmData) => ({
    type: DELETE_CLIENT,
    payload: firmData
})

export const deleteFirm = (id) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'firms/delete/' + id)
            .then(result => {
                dispatch(_deleteFirm(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                dispatch(errorAlert())
                console.log(error)
            })
    }
}

