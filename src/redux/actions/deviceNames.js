import {
    DELETE_DEVICE_NAMES,
    GET_DEVICE_NAMES,
    GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE,
    INSERT_DEVICE_NAME,
    UPDATE_DEVICE_NAME
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllDeviceNames = (deviceNamesData) => ({
    type: GET_DEVICE_NAMES,
    payload: deviceNamesData
})

export const getAllDeviceNames = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'deviceNames')
            .then(result => {
                dispatch(_getAllDeviceNames(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertBrand = (brandData) => ({
    type: INSERT_DEVICE_NAME,
    payload: brandData
})

export const insertBrand = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'deviceNames' , {
                name
            })
            .then(result => {
                dispatch(_insertBrand(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteDeviceNames = (deviceNamesData) => ({
    type: DELETE_DEVICE_NAMES,
    payload: deviceNamesData
})

export const deleteDeviceNames = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'deviceNames/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteDeviceNames(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateBrand = (brandData) => ({
    type: UPDATE_DEVICE_NAME,
    payload: brandData
})

export const updateBrand = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'deviceNames/update/' + id)
            .then(result => {
                dispatch(_updateBrand(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteBrandProblems = (brandData) => ({
    type: GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE,
    payload: brandData
})

export const getPotentialDeleteBrandProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteBrandProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
