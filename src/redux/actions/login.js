import {API_URL} from "../../constants/urlConstants";
import {GENERATE, LOGIN} from "./types";
import axios from "axios";
import {errorAlert, successAlert} from "./alerts";

const _login = (data) => ({
    type: LOGIN,
    payload: data
})

export const login = (login, password) => {
    return dispatch => {
        return axios
            .post(API_URL + 'login/', {
                login, password
            })
            .then(result => {
                dispatch(_login(result.data))
                if (result.status === 200) window.location.href = 'clients';
            })
            .catch(error => {
                dispatch(errorAlert())
                console.log(error)
            })
    }
}

const _generate = () => ({
    type: GENERATE
})

export const generate = () => {
    return dispatch => {
        return axios
            .post(API_URL + 'generate/')
            .then(result => {
                dispatch(_generate())
                if (result.status === 200) successAlert()
            })
            .catch(error => {
                console.log(error)
            })
    }
}
