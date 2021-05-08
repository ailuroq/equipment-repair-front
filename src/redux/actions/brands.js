import {DELETE_BRANDS, GET_BRANDS, GET_POTENTIAL_BRAND_DATA_TO_DELETE, INSERT_BRAND, UPDATE_BRAND} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllBrands = (brandsData) => ({
    type: GET_BRANDS,
    payload: brandsData
})

export const getAllBrands = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'brands')
            .then(result => {
                dispatch(_getAllBrands(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertBrand = (brandData) => ({
    type: INSERT_BRAND,
    payload: brandData
})

export const insertBrand = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'brands' , {
                name
            })
            .then(result => {
                dispatch(_insertBrand(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deleteBrands = (brandsData) => ({
    type: DELETE_BRANDS,
    payload: brandsData
})

export const deleteBrands = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'brands/delete', {
                ids
            })
            .then(result => {
                dispatch(_deleteBrands(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updateBrand = (brandData) => ({
    type: UPDATE_BRAND,
    payload: brandData
})

export const updateBrand = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'brands/update/' + id)
            .then(result => {
                dispatch(_updateBrand(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeleteBrandProblems = (brandData) => ({
    type: GET_POTENTIAL_BRAND_DATA_TO_DELETE,
    payload: brandData
})

export const getPotentialDeleteBrandProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'brands/problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeleteBrandProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
