import {
    DELETE_CITIES,
    GET_CITIES,
    GET_POTENTIAL_CITY_DATA_TO_DELETE,
    INSERT_CITY,
    UPDATE_CITY
} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllCities = (citiesData) => ({
    type: GET_CITIES,
    payload: citiesData
})

export const getAllCities = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'cities')
            .then(result => {
                dispatch(_getAllCities(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertCity = (cityData) => ({
    type: INSERT_CITY,
    payload: cityData
})

export const insertCity = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'cities' , {
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

const _deleteCities = (citiesData) => ({
    type: DELETE_CITIES,
    payload: citiesData
})

export const deleteCities = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'cities/delete', {
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

const _updateCity = (cityData) => ({
    type: UPDATE_CITY,
    payload: cityData
})

export const updateCity = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'cities/update/' + id)
            .then(result => {
                dispatch(_updateCity(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteCityProblems = (cityData) => ({
    type: GET_POTENTIAL_CITY_DATA_TO_DELETE,
    payload: cityData
})

export const getPotentialDeleteCityProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteCityProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
