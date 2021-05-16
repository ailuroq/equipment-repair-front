import {API_URL} from "../../constants/urlConstants";
import {GET_FIRST_QUERY_INFO} from "./types";
import axios from "axios";

const {FIRST_QUERY_DATA} = require("./types");

const _getFirstQueryInfo = data => ({
    type: GET_FIRST_QUERY_INFO,
    payload: data
})

export const getFirstQueryInfo = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/first/info')
            .then(result => {
                dispatch(_getFirstQueryInfo(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}


const _firstQuery = (data) => ({
    type: FIRST_QUERY_DATA,
    payload: data
})

export const firstQuery = firmId => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/first?firmId=' + firmId)
            .then(result => {
                dispatch(_firstQuery(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
