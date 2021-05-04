import {GET_THIRD_QUERY_DATA} from "./types";
import axios from "axios";
import {API_URL} from "../../constants/urlConstants";

const _getThirdQueryData = (queryData) => ({
    type: GET_THIRD_QUERY_DATA,
    payload: queryData,
})

export const getThirdQueryData = (month, year) => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/third?month='+month+'&year='+year)
            .then(result => {
                dispatch(_getThirdQueryData(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
