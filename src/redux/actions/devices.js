import axios from "axios";
import {GET_DEVICES} from "./types";
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