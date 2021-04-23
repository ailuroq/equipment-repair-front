import {GET_MASTERS} from "./types";
import axios from "axios";
import {API_URL} from "../../constants/urlConstants";

const _getMasters = (clientData) => ({
    type: GET_MASTERS,
    payload: clientData
})

export const getMasters = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'masters/')
            .then(result => {
                dispatch(_getMasters(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}