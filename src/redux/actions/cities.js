import {
    CREATE_BRAND_DIALOG_CLOSE,
    CREATE_BRAND_DIALOG_OPEN, CREATE_CITY_DIALOG_CLOSE, CREATE_CITY_DIALOG_OPEN,
    DELETE_CITIES, FIND_CITY,
    GET_CITIES,
    GET_POTENTIAL_CITY_DATA_TO_DELETE,
    INSERT_CITY, UPDATE_BRAND_DIALOG_CLOSE,
    UPDATE_CITY, UPDATE_CITY_DIALOG_CLOSE, UPDATE_CITY_DIALOG_OPEN
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
                dispatch(getAllCities())
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
            .post(API_URL + 'cities/update/' + id, {
                name
            })
            .then(result => {
                dispatch(_updateCity(result.data))
                dispatch(getAllCities())
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
            .get(API_URL + 'cities/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteCityProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCityDialogOpen = () => ({
    type: UPDATE_CITY_DIALOG_OPEN
})

export const updateCityDialogClose = () => ({
    type: UPDATE_CITY_DIALOG_CLOSE
})

export const createCityDialogOpen = () => ({
    type: CREATE_CITY_DIALOG_OPEN,
})

export const createCityDialogClose = () => ({
    type: CREATE_CITY_DIALOG_CLOSE
})

const _findCity = (findData) => ({
    type: FIND_CITY,
    payload: findData
})

export const findCity = (data) => {
    return dispatch => {
        return axios
            .get(API_URL + 'cities/search?data=' + data)
            .then(result => {
                dispatch(_findCity(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
