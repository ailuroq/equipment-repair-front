import {API_URL} from "../../constants/urlConstants";
import {LOGIN} from "./types";
import axios from "axios";
import {errorAlert} from "./alerts";

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
