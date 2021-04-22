import axios from "axios";
import {GET_DEVICES} from "./types";
import {API_URL} from "../../constants/urlConstants";

const _getFirms = (firmData) => ({
    type: GET_DEVICES,
    payload: firmData
})

export const getFirms = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'repair-firms/')
            .then(result => {
                dispatch(_getFirms(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}