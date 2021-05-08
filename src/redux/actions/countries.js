import {
    DELETE_COUNTRIES,
    GET_COUNTRIES,
    GET_POTENTIAL_COUNTRY_DATA_TO_DELETE,
    INSERT_COUNTRY,
    UPDATE_COUNTRY
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllCities = (countriesData) => ({
    type: GET_COUNTRIES,
    payload: countriesData
})

export const getAllCities = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'countries')
            .then(result => {
                dispatch(_getAllCities(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertCity = (countryData) => ({
    type: INSERT_COUNTRY,
    payload: countryData
})

export const insertCity = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries' , {
                name
            })
            .then(result => {
                dispatch(_insertCity(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteCities = (countriesData) => ({
    type: DELETE_COUNTRIES,
    payload: countriesData
})

export const deleteCities = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteCities(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateCity = (countryData) => ({
    type: UPDATE_COUNTRY,
    payload: countryData
})

export const updateCity = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/update/' + id)
            .then(result => {
                dispatch(_updateCity(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteCityProblems = (countryData) => ({
    type: GET_POTENTIAL_COUNTRY_DATA_TO_DELETE,
    payload: countryData
})

export const getPotentialDeleteCityProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'countries/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteCityProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
