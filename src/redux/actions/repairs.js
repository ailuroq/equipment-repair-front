import {
    DELETE_REPAIRS,
    FIND_REPAIRS,
    GET_POTENTIAL_REPAIR_DATA_TO_DELETE,
    GET_REPAIR_FOR_VIEW,
    GET_REPAIRS,
    INSERT_REPAIR,
    UPDATE_REPAIR
} from "./types";
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

const _getInsertRepairData = (repairData) => ({
    type: GET_POTENTIAL_REPAIR_DATA_TO_DELETE,
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
            })
            .catch(error => {
                console.log(error)
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
            .put(API_URL + 'repairs/'+id)
            .then(result => {
                dispatch(_updateRepair(result.data))
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

export const findRepairs = (completion, price) => {
    return dispatch => {
        return axios
            .get(API_URL + 'repairs/search?completion=' + completion + '&price=' + price)
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
            })
            .catch(error => {
                console.log(error)
            })
    }
}
