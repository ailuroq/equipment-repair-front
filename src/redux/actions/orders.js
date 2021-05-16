import axios from "axios";
import {
    DELETE_ORDERS,
    FIND_ORDERS, GET_INSERT_ORDER_INFO,
    GET_ORDER,
    GET_ORDERS,
    GET_POTENTIAL_ORDER_DATA_TO_DELETE,
    INSERT_ORDER, UPDATE_ORDER
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import {errorAlert, successAlert} from "./alerts";

const _getOrders = (orderData) => ({
    type: GET_ORDERS,
    payload: orderData
})

export const getOrders = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'orders/')
            .then(result => {
                dispatch(_getOrders(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getOrder = orderData => ({
    type: GET_ORDER,
    payload: orderData
})

export const getOrder = id => {
    return dispatch => {
        return axios
            .get(API_URL + 'orders/info/' + id)
            .then(result => {
                dispatch(_getOrder(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteOrders = (deleteData) => ({
    type: DELETE_ORDERS,
    payload: deleteData
})

export const deleteOrders = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'orders/delete/', {
                ids
            })
            .then(result => {
                dispatch(_deleteOrders(result.data))
                dispatch(getOrders())
            })
    }
}

const _getPotentialDataToDelete = (potentialDataToDelete) => ({
    type: GET_POTENTIAL_ORDER_DATA_TO_DELETE,
    payload: potentialDataToDelete
})

export const getPotentialDataToDelete = orderId => {
    return dispatch => {
        return axios
            .get(API_URL + 'orders/problems/'+ orderId)
            .then(result => {
                dispatch(_getPotentialDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getInsertOrderInfo = data => ({
    type: GET_INSERT_ORDER_INFO,
    payload: data
})

export const getInsertOrderInfo = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'orders/new')
            .then(result => {
                dispatch(_getInsertOrderInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _findOrder = (data) => ({
    type: FIND_ORDERS,
    payload: data
})

export const findOrder = (data) => {
    return dispatch => {
        return axios
            .get(API_URL + 'orders/search?data=' + data)
            .then(result => {
                dispatch(_findOrder(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertOrder = (orderData) => ({
    type: INSERT_ORDER,
    payload: orderData
})

export const insertOrder = (receiptNumber, orderDate, completionDate, deviceId, masterId) => {
    return dispatch => {
        return axios
            .post(API_URL + 'orders/', {
                receiptNumber, orderDate, completionDate, deviceId, masterId
            })
            .then(result => {
                dispatch(_insertOrder(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}


const _updateOrder = (data) => ({
    type: UPDATE_ORDER,
    payload: data
})

export const updateOrder = (id, receiptNumber, orderDate, completionDate, deviceId, masterId) => {
    return dispatch => {
        return axios
            .post(API_URL + 'orders/update', {
                id, receiptNumber, orderDate, completionDate, deviceId, masterId
            })
            .then(result => {
                dispatch(_updateOrder(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}
