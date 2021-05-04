import {GET_SECOND_QUERY_DATA} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getSecondQueryData = (queryData) => ({
    type: GET_SECOND_QUERY_DATA,
    payload: queryData,
})

export const getSecondQueryData = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/second')
            .then(result => {
                dispatch(_getSecondQueryData(result.data))
            })
            .catch(error => {
                console.log(error)
        })
    }
}
