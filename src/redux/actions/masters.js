import {
    DELETE_MASTER,
    FIND_MASTER, GET_INSERT_MASTER_INFO,
    GET_MASTER,
    GET_MASTERS,
    GET_POTENTIAL_DATA_TO_DELETE,
    INSERT_CLIENT, INSERT_INFO, INSERT_MASTER, INSERT_MASTER_INFO
} from "./types";
import axios from "axios";
import {API_URL} from "../../constants/urlConstants";
import {errorAlert, successAlert} from "./alerts";

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
                dispatch(successAlert())
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
    type: INSERT_MASTER,
    payload: masterData
})

export const insertMaster = (lastname, firstname, middlename, experience, post, firm ) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'masters/', {
                lastname, firstname, middlename, experience, post, firm
            })
            .then(result => {
                dispatch(_insertMaster(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}

const _getInsertMasterInfo = (data) => ({
    type: GET_INSERT_MASTER_INFO,
    payload: data
})

export const getInsertMasterInfo = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'masters/new')
            .then(result => {
                dispatch(_getInsertMasterInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
