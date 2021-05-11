import {
    DELETE_WORKS,
    GET_WORKS,
    GET_POTENTIAL_WORK_DATA_TO_DELETE,
    INSERT_WORK,
    UPDATE_WORK,
    FIND_WORK,
    UPDATE_WORK_DIALOG_OPEN, UPDATE_WORK_DIALOG_CLOSE, CREATE_WORK_DIALOG_OPEN, CREATE_WORK_DIALOG_CLOSE
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllWorks = (worksData) => ({
    type: GET_WORKS,
    payload: worksData
})

export const getAllWorks = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'works')
            .then(result => {
                dispatch(_getAllWorks(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertWork = (workData) => ({
    type: INSERT_WORK,
    payload: workData
})

export const insertWork = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'works' , {
                name
            })
            .then(result => {
                dispatch(_insertWork(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteWorks = (worksData) => ({
    type: DELETE_WORKS,
    payload: worksData
})

export const deleteWorks = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'works/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteWorks(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateWork = (workData) => ({
    type: UPDATE_WORK,
    payload: workData
})

export const updateWork = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'works/update/' + id)
            .then(result => {
                dispatch(_updateWork(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteWorkProblems = (workData) => ({
    type: GET_POTENTIAL_WORK_DATA_TO_DELETE,
    payload: workData
})

export const getPotentialDeleteWorkProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'works/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteWorkProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const updateWorkDialogOpen = () => ({
    type: UPDATE_WORK_DIALOG_OPEN
})

export const updateWorkDialogClose = () => ({
    type: UPDATE_WORK_DIALOG_CLOSE
})
export const createWorkDialogOpen = () => ({
    type: CREATE_WORK_DIALOG_OPEN,
})

export const createWorkDialogClose = () => ({
    type: CREATE_WORK_DIALOG_CLOSE
})

const _findWork = (findData) => ({
    type: FIND_WORK,
    payload: findData
})

export const findWork = (data) => {
    return dispatch => {
        return axios
            .get(API_URL + 'works/search?data=' + data)
            .then(result => {
                dispatch(_findWork(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
