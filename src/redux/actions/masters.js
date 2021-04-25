import {
    DELETE_MASTER,
    FIND_MASTER,
    GET_MASTER,
    GET_MASTERS,
    GET_POTENTIAL_DATA_TO_DELETE,
    INSERT_CLIENT, INSERT_INFO, INSERT_MASTER, INSERT_MASTER_INFO
} from "./types";
import axios from "axios";
import {API_URL} from "../../constants/urlConstants";

const _getMasters = (masterData) => ({
    type: GET_MASTERS,
    payload: masterData
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

const _getMaster = (masterData) => ({
    type: GET_MASTER,
    payload: masterData
})

export const getMaster = (masterId) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'masters/' + masterId)
            .then(result => {
                dispatch(_getMaster(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteMaster = (masterData) => ({
    type: DELETE_MASTER,
    payload: masterData
})

export const deleteMaster = (masterId) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'masters/delete/' + masterId)
            .then(result => {
                dispatch(_deleteMaster(result.data))
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

export const getPotentialDataToDelete = (masterId) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'masters/problems/' + masterId)
            .then(result => {
                dispatch(_getPotentialDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _findMaster = (masterData) => ({
    type: FIND_MASTER,
    payload: masterData
})

export const findMaster = (masterData) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'masters/search?masterData=' + masterData)
            .then(result => {
                dispatch(_findMaster(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertMaster = (masterData) => ({
    type: INSERT_CLIENT,
    payload: masterData
})

export const insertMaster = (lastname, middlename, firstname, phone) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'masters/', {
                lastname, middlename, firstname, phone
            })
            .then(result => {
                dispatch(_insertMaster(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getInsertMasterInfo = (data) => ({
    type: INSERT_MASTER_INFO,
    payload: data
})

export const getInsertMasterInfo = () => {
    return (dispatch) => {
        return axios
            .get(API_URL +)
            .then(result => {
                dispatch(_getInsertMasterInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
