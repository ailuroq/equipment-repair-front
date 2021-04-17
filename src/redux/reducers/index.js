import {combineReducers} from "redux";
import clients from './clients'
import devices from "./devices";

export default combineReducers({
    clients,
    devices
})