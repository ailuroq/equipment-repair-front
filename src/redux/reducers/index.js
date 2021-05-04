import {combineReducers} from "redux"
import clients from './clients'
import devices from "./devices"
import firms from "./firms"
import orders from './orders'
import search from './search'
import masters from './masters'
import alerts from './alerts'
import repairs from './repairs'
import secondQuery from './secondQuery'
import thirdQuery from './thirdQuery'

export default combineReducers({
    clients,
    devices,
    firms,
    orders,
    search,
    masters,
    alerts,
    repairs,
    secondQuery,
    thirdQuery
})
