import axios from "axios";
import {
    DELETE_DEVICES, FIND_DEVICES,
    GET_DEVICE,
    GET_DEVICE_UPDATE_DATA,
    GET_DEVICES,
    GET_INSERT_DEVICE_INFO, GET_POTENTIAL_DEVICE_DATA_TO_DELETE,
    UPDATE_DEVICE
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import {errorAlert, successAlert} from "./alerts";

const _getDevices = (deviceData) => ({
    type: GET_DEVICES,
    payload: deviceData
})

export const getDevices = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'devices/')
            .then(result => {
                dispatch(_getDevices(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getInsertDeviceInfo = (data) => ({
    type: GET_INSERT_DEVICE_INFO,
    payload: data
})

export const getInsertDeviceInfo = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'devices/new')
            .then(result => {
                dispatch(_getInsertDeviceInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getDevice = (deviceInfo) => ({
    type: GET_DEVICE,
    payload: deviceInfo
})

export const getDevice = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'devices/info/' + id)
            .then(result => {
                dispatch(_getDevice(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getDeviceUpdateData = (deviceInfo) => ({
    type: GET_DEVICE_UPDATE_DATA,
    payload: deviceInfo
})

export const getDeviceUpdateData = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'devices/edit-info/' + id)
            .then(result => {
                dispatch(_getDeviceUpdateData(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateDevice = (deviceInfo) => ({
    type: UPDATE_DEVICE,
    payload: deviceInfo
})

export const updateDevice = (id, name, country, photo, client, brand, model) => {
    return async dispatch => {
        await axios
            .post(API_URL + 'devices/update-photo/' + id, {
                photo
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
                return;
            })
        return axios
            .post(API_URL + 'devices/update/' + id, {
                name, country, client, brand, model
            })
            .then(result => {
                dispatch(_updateDevice(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}

const _deleteDevices = (deviceData) => ({
    type: DELETE_DEVICES,
    payload: deviceData
})

export const deleteDevices = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'devices/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteDevices(result.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}

const _getPotentialDeviceDataToDelete = (deviceData) => ({
    type: GET_POTENTIAL_DEVICE_DATA_TO_DELETE,
    payload: deviceData
})

export const getPotentialDeviceDataToDelete = id => {
    return dispatch => {
        return axios
            .get(API_URL + 'devices/delete/info/' + id)
            .then(result => {
                dispatch(_getPotentialDeviceDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}

const _findDevices = (deviceData) => ({
    type: FIND_DEVICES,
    payload: deviceData
})

export const findDevice = data => {
    return dispatch => {
        return axios
            .get(API_URL + '/devices/search?deviceData='+data)
            .then(result => {
                dispatch(_findDevices(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
