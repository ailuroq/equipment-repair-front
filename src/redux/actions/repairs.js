import {
    DELETE_REPAIRS,
    FIND_REPAIRS, GET_INSERT_REPAIR_INFO,
    GET_POTENTIAL_REPAIR_DATA_TO_DELETE,
    GET_REPAIR_FOR_VIEW,
    GET_REPAIRS, GET_UPDATE_REPAIR_DATA,
    INSERT_REPAIR,
    UPDATE_REPAIR
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";
import {errorAlert, successAlert} from "./alerts";

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

const _getInsertRepairData = (repairData) => ({
    type: GET_INSERT_REPAIR_INFO,
    payload: repairData,
})

export const getInsertRepairData = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'repairs/new')
            .then(result => {
                dispatch(_getInsertRepairData(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertRepair = (repairData) => ({
    type: INSERT_REPAIR,
    payload: repairData
})

export const insertRepair = (orderId, workId, completion, price) => {
    return dispatch => {
        return axios
            .post(API_URL + 'repairs/', {
                orderId, workId, completion, price
            })
            .then(result => {
                dispatch(_insertRepair(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}

const _updateRepair = (repairData) => ({
    type: UPDATE_REPAIR,
    payload: repairData
})

export const updateRepair = (id, orderId, workId, completion, price) => {
    return dispatch => {
        return axios
            .post(API_URL + 'repairs/update', {
                id, orderId, workId, completion, price
            })
            .then(result => {
                dispatch(_updateRepair(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                dispatch(errorAlert())
                console.log(error)
            })
    }
}

const _getRepairUpdateInfo = (data) => ({
    type: GET_UPDATE_REPAIR_DATA,
    payload: data
})

export const getRepairUpdateInfo = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + '/repairs/update/info/' + id)
            .then(result => {
                dispatch(_getRepairUpdateInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _findRepairs = (repairsData) => ({
    type: FIND_REPAIRS,
    payload: repairsData
})

export const findRepairs = (data) => {
    return dispatch => {
        return axios
            .get(API_URL + 'repairs/search?data=' + data)
            .then(result => {
                dispatch(_findRepairs(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getRepairForView = (repairData) => ({
    type: GET_REPAIR_FOR_VIEW,
    payload: repairData
})

export const getRepairForView = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'repairs/info/'+ id)
            .then(result => {
                dispatch(_getRepairForView(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteRepairs = (repairsData) => ({
    type: DELETE_REPAIRS,
    payload: repairsData
})

export const deleteRepairs = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'repairs/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteRepairs(result.data))
                dispatch(getRepairs())
                dispatch(successAlert())
            })
            .catch(error => {
                dispatch(errorAlert())
                console.log(error)
            })
    }
}
