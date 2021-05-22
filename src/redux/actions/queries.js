import {API_URL} from "../../constants/urlConstants";
import axios from "axios";
import moment from "moment";

const {GET_MASTER_ORDERS_PER_PERIOD} = require("./types");

const _getMasterOrdersPerPeriod = (data) => ({
    type: GET_MASTER_ORDERS_PER_PERIOD,
    payload: data
})

export const getMasterOrdersPerPeriod = (from, to, masterId) => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/orders_by_master_per_period?masterId=' + masterId + '&from=' + moment(from).format('YYYY/MM/DD') + '&to=' + moment(to).format('YYYY/MM/DD'))
            .then(result => {
                dispatch(_getMasterOrdersPerPeriod(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}


