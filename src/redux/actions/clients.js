import axios from 'axios'
import {DELETE_CLIENT, GET_CLIENT, GET_CLIENTS, GET_POTENTIAL_DATA_TO_DELETE} from "./types";
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

const _deleteClient = (clientData) => ({
    type: DELETE_CLIENT,
    payload: clientData
})

export const deleteClient = (id) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'clients/delete/' + id)
            .then(result => {
                dispatch(_deleteClient(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDataToDelete = (potentialDataToDelete) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE,
    payload: potentialDataToDelete
})

export const getPotentialDataToDelete = (userId) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'clients/problems/' + userId)
            .then(result => {
                dispatch(_getPotentialDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}