import {combineReducers} from "redux"
import clients from './clients'
import devices from "./devices"
import firms from "./firms"
import orders from './orders'
import search from './search'
import masters from './masters'
import alerts from './alerts'
import repairs from './repairs'
import brands from './brands'
import cities from './cities'
import countries from './countries'
import posts from './posts'
import works from './works'
import deviceNames from './deviceNames'
import queries from './queries';
import firstQuery from './firstQuery'
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
    brands,
    cities,
    countries,
    posts,
    works,
    deviceNames,
    queries,
    firstQuery,
    secondQuery,
    thirdQuery
})
