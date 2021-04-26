import {GET_REPAIRS} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getRepairs = (repairData) => ({
    type: GET_REPAIRS,
    payload: repairData
})

export const getRepairs = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'repairs/')
            .then(result => {
                dispatch(_getRepairs(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

