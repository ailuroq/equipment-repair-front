import axios from "axios";
import {
    DELETE_FIRM,
    FIND_FIRM,
    GET_FIRM_FOR_VIEW,
    GET_FIRMS, GET_INSERT_FIRM_DATA,
    GET_POTENTIAL_FIRM_DATA_TO_DELETE, GET_UPDATE_FIRM_DATA, INSERT_FIRM, UPDATE_FIRM
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import {errorAlert, successAlert} from "./alerts";

const _getFirms = (firmData) => ({
    type: GET_FIRMS,
    payload: firmData
})

export const getFirms = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'firms/')
            .then(result => {
                dispatch(_getFirms(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDataToDelete = (potentialDataToDelete) => ({
    type: GET_POTENTIAL_FIRM_DATA_TO_DELETE,
    payload: potentialDataToDelete
})

export const getPotentialDataToDelete = (firmId) => {
    return (dispatch) => {
        return axios
            .get(API_URL + 'firms/problems/' + firmId)
            .then(result => {
                dispatch(_getPotentialDataToDelete(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteFirm = (firmData) => ({
    type: DELETE_FIRM,
    payload: firmData
})

export const deleteFirm = (ids) => {
    return (dispatch) => {
        return axios
            .post(API_URL + 'firms/delete/', {
                ids
            })
            .then(result => {
                dispatch(_deleteFirm(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                dispatch(errorAlert())
                console.log(error)
            })
    }
}

const _findFirm = (firmData) => ({
    type: FIND_FIRM,
    payload: firmData
})

export const findFirm = (data) => {
    return dispatch => {
        if (!data) {
            dispatch(getFirms())
        }
        else {
            return axios
                .get(API_URL + 'firms/search?findData='+data)
                .then(result => {
                    dispatch(_findFirm(result.data))
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}

const _getFirmForView = (firmData) => ({
    type: GET_FIRM_FOR_VIEW,
    payload: firmData
})

export const getFirmForView = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'firms/info/'+id)
            .then(result => {
                dispatch(_getFirmForView(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateFirm = (firmData) => ({
    type: UPDATE_FIRM,
    payload: firmData
})

export const updateFirm = (id, name, address, phone, cityId) => {
    return dispatch => {
        return axios
            .put(API_URL + 'firms/update', {
                id, name, address, phone, cityId
            })
            .then(result => {
                dispatch(_updateFirm(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getUpdateFirmData = (firmData) => ({
    type: GET_UPDATE_FIRM_DATA,
    payload: firmData
})

export const getUpdateFirmData = (id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'firms/update/info/' + id)
            .then(result => {
                dispatch(_getUpdateFirmData(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getInsertFirmData = (firmData) => ({
    type: GET_INSERT_FIRM_DATA,
    payload: firmData
})

export const getInsertFirmData = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'firms/new')
            .then(result => {
                dispatch(_getInsertFirmData(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertFirm = (firmData) => ({
    type: INSERT_FIRM,
    payload: firmData
})

export const insertFirm = (name, address, phone, cityId) => {
    return dispatch => {
        return axios
            .post(API_URL + 'firms/', {
                name, address, phone, cityId
            })
            .then(result => {
                dispatch(_insertFirm(result.data))
                dispatch(successAlert())
            })
            .catch(error => {
                console.lor(error)
                dispatch(errorAlert())
            })
    }
}
