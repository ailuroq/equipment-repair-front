import axios from "axios";
import {GET_DEVICES, GET_INSERT_DEVICE_INFO} from "./types";
import {API_URL} from "../../constants/urlConstants";

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
