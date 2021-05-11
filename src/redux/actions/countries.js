import {
    CREATE_COUNTRY_DIALOG_CLOSE, CREATE_COUNTRY_DIALOG_OPEN,
    DELETE_COUNTRIES, FIND_COUNTRY,
    GET_COUNTRIES,
    GET_POTENTIAL_COUNTRY_DATA_TO_DELETE,
    INSERT_COUNTRY,
    UPDATE_COUNTRY, UPDATE_COUNTRY_DIALOG_CLOSE, UPDATE_COUNTRY_DIALOG_OPEN
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";
import {errorAlert, successAlert} from "./alerts";

const _getAllCountries = (countriesData) => ({
    type: GET_COUNTRIES,
    payload: countriesData
})

export const getAllCountries = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'countries')
            .then(result => {
                dispatch(_getAllCountries(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertCountry = (countryData) => ({
    type: INSERT_COUNTRY,
    payload: countryData
})

export const insertCountry = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries' , {
                name
            })
            .then(result => {
                dispatch(_insertCountry(result.data))
                dispatch(getAllCountries())
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteCountries = (countriesData) => ({
    type: DELETE_COUNTRIES,
    payload: countriesData
})

export const deleteCountries = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteCountries(result.data))
                dispatch(getAllCountries())
                dispatch(successAlert())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateCountry = (countryData) => ({
    type: UPDATE_COUNTRY,
    payload: countryData
})

export const updateCountry = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/update/' + id, {
                name
            })
            .then(result => {
                dispatch(_updateCountry(result.data))
                dispatch(getAllCountries())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteCountryProblems = (countryData) => ({
    type: GET_POTENTIAL_COUNTRY_DATA_TO_DELETE,
    payload: countryData
})

export const getPotentialDeleteCountryProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteCountryProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCountryDialogOpen = () => ({
    type: UPDATE_COUNTRY_DIALOG_OPEN
})

export const updateCountryDialogClose = () => ({
    type: UPDATE_COUNTRY_DIALOG_CLOSE
})

export const createCountryDialogOpen = () => ({
    type: CREATE_COUNTRY_DIALOG_OPEN
})

export const createCountryDialogClose = () => ({
    type: CREATE_COUNTRY_DIALOG_CLOSE
})

const _findCountry = (findData) => ({
    type: FIND_COUNTRY,
    payload: findData
})

export const findCountry = data => {
    return dispatch => {
        return axios
            .get(API_URL + 'countries/search?data=' + data)
            .then(result => {
                dispatch(_findCountry(result.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAlert())
            })
    }
}
