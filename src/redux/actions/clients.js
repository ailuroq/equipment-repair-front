import axios from 'axios'
import {GET_CLIENT, GET_CLIENTS} from "./types";
import {API_URL} from "../../constants/urlConstants";

const _getClients = (clientData) => ({
    type: GET_CLIENTS,
    payload: clientData
})

export const getClients = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'clients/')
            .then(result => {
                dispatch(_getClients(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getClient = (clientData) => ({
    type: GET_CLIENT,
    payload: clientData
})

export const getClient = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'clients/info/' + id)
            .then(result => {
                dispatch(_getClient(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}