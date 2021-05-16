import {
    CREATE_DEVICE_NAME_DIALOG_CLOSE,
    CREATE_DEVICE_NAME_DIALOG_OPEN,
    DELETE_DEVICE_NAMES, FIND_DEVICE_NAME,
    GET_DEVICE_NAMES,
    GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE,
    INSERT_DEVICE_NAME,
    UPDATE_DEVICE_NAME, UPDATE_DEVICE_NAME_DIALOG_CLOSE, UPDATE_DEVICE_NAME_DIALOG_OPEN
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
            .get(API_URL + 'device-names')
            .then(result => {
                dispatch(_getAllDeviceNames(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertDeviceName = (deviceNameData) => ({
    type: INSERT_DEVICE_NAME,
    payload: deviceNameData
})

export const insertDeviceName = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'device-names' , {
                name
            })
            .then(result => {
                dispatch(_insertDeviceName(result.data))
                dispatch(getAllDeviceNames())
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
            .post(API_URL + 'device-names/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteDeviceNames(result.data))
                dispatch(getAllDeviceNames())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateDeviceName = (deviceNameData) => ({
    type: UPDATE_DEVICE_NAME,
    payload: deviceNameData
})

export const updateDeviceName = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'device-names/update/' + id, {
                name
            })
            .then(result => {
                dispatch(_updateDeviceName(result.data))
                dispatch(getAllDeviceNames())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteDeviceNameProblems = (deviceNameData) => ({
    type: GET_POTENTIAL_DEVICE_NAME_DATA_TO_DELETE,
    payload: deviceNameData
})

export const getPotentialDeleteDeviceNameProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'device-names/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteDeviceNameProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateDeviceNameDialogOpen = () => ({
    type: UPDATE_DEVICE_NAME_DIALOG_OPEN
})

export const updateDeviceNameDialogClose = () => ({
    type: UPDATE_DEVICE_NAME_DIALOG_CLOSE
})

export const createDeviceNameDialogOpen = () => ({
    type: CREATE_DEVICE_NAME_DIALOG_OPEN
})

export const createDeviceNameDialogClose = () => ({
    type: CREATE_DEVICE_NAME_DIALOG_CLOSE
})

const _findDeviceName = (data) => ({
    type: FIND_DEVICE_NAME,
    payload: data
})

export const findDeviceName = (data) => {
    return dispatch => {
        return axios
            .get(API_URL + 'device-names/search?data=' + data)
            .then(result => {
                dispatch(_findDeviceName(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
