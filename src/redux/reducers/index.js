import {combineReducers} from "redux"
import clients from './clients'
import devices from "./devices"
import firms from "./firms"
import orders from './orders'
import search from './search'

export default combineReducers({
    clients,
    devices,
    firms,
    orders,
    search
})