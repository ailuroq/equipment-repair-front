import axios from "axios";
import {GET_ORDERS} from "./types";
import {API_URL} from "../../constants/urlConstants";

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