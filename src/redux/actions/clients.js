import axios from 'axios'
import {GET_CLIENTS} from "./types";
import {API_URL} from "../../constants/urlConstants";

const _getClients = (clientData) => ({
    type: GET_CLIENTS,
    payload: clientData
})

export const getClients = (limit) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'clients/' + limit)
            .then(result => {
                dispatch(_getClients(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}