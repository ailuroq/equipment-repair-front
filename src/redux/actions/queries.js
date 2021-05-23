import {API_URL} from "../../constants/urlConstants";
import axios from "axios";
import moment from "moment";
import {
    COUNT_FIRM_ORDERS_PER_PERIOD,
    GET_COUNT_MASTERS_PER_FIRMS, GET_COUNT_ORDERS_PER_FIRM,
    GET_DEVICES_BY_BRAND, GET_FIRMS_WITH_NO_ORDER_PER_PERIOD, GET_MASTERS_MORE_AVG_EXP, GET_THE_MOST_EXPENSIVE_ORDER,
    GROUP_DEVICES_BY_COUNTRIES, GROUP_REPAIRS_BY_TYPE,
    LIST_OF_NOT_MADE_ORDERS
} from "./types";

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

const _getDevicesByBrand = data => ({
    type: GET_DEVICES_BY_BRAND,
    payload: data
})

export const getDevicesByBrand = brandId => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/find_devices_by_brand?brandId=' + brandId)
            .then(result => {
                dispatch(_getDevicesByBrand(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getListNotMadeOrders = data => ({
    type: LIST_OF_NOT_MADE_ORDERS,
    payload: data
})

export const getListNotMadeOrders = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/list_not_made_orders')
            .then(result => {
                dispatch(_getListNotMadeOrders(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getCountMastersPerFirms = data => ({
    type: GET_COUNT_MASTERS_PER_FIRMS,
    payload: data
})

export const getCountMastersPerFirms = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/count_masters_per_firms')
            .then(result => {
                dispatch(_getCountMastersPerFirms(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _groupDevicesByCountries = data => ({
    type: GROUP_DEVICES_BY_COUNTRIES,
    payload: data
})

export const groupDevicesByCountries = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/group_devices_by_countries')
            .then(result => {
                dispatch(_groupDevicesByCountries(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _groupRepairsByType = data => ({
    type: GROUP_REPAIRS_BY_TYPE,
    payload: data
})

export const groupRepairsByType = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/group_repairs_by_type')
            .then(result => {
                dispatch(_groupRepairsByType(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getCountOrdersPerFirm = data => ({
    type: GET_COUNT_ORDERS_PER_FIRM,
    payload: data
})

export const getCountOrdersPerFirm = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/count_orders_per_firm')
            .then(result => {
                dispatch(_getCountOrdersPerFirm(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getTheMostExpensiveOrder = data => ({
    type: GET_THE_MOST_EXPENSIVE_ORDER,
    payload: data
})

export const getTheMostExpensiveOrder = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/the_most_expensive_order')
            .then(result => {
                dispatch(_getTheMostExpensiveOrder(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getMastersMoreAvgExp = data => ({
    type: GET_MASTERS_MORE_AVG_EXP,
    payload: data
})

export const getMastersMoreAvgExp = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/masters_exp_more_avg')
            .then(result => {
                dispatch(_getMastersMoreAvgExp(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getFirmWithNoOrderPerPeriod = data => ({
    type: GET_FIRMS_WITH_NO_ORDER_PER_PERIOD,
    payload: data
})

export const getFirmWithNoOrderPerPeriod = (from, to) => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/no_orders_per_period?from=' + moment(from).format('YYYY/MM/DD') + '&to=' + moment(to).format('YYYY/MM/DD'))
            .then(result => {
                dispatch(_getFirmWithNoOrderPerPeriod(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _countFirmOrdersPerPeriod = data => ({
    type: COUNT_FIRM_ORDERS_PER_PERIOD,
    payload: data
})

export const countFirmOrdersPerPeriod = (from, to, id) => {
    return dispatch => {
        return axios
            .get(API_URL + 'complex-queries/count_orders_per_period?from=' + moment(from).format('YYYY/MM/DD') + '&to=' + moment(to).format('YYYY/MM/DD') + '&id=' + id)
            .then(result => {
                dispatch(_countFirmOrdersPerPeriod(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
