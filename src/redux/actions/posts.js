import {DELETE_POSTS, GET_POSTS, GET_POTENTIAL_POST_DATA_TO_DELETE, INSERT_POST, UPDATE_POST} from "./types";
import {API_URL} from "../../constants/urlConstants";
import axios from "axios";

const _getAllPosts = (postsData) => ({
    type: GET_POSTS,
    payload: postsData
})

export const getAllPosts = () => {
    return dispatch => {
        return axios
            .get(API_URL + 'posts')
            .then(result => {
                dispatch(_getAllPosts(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _insertPost = (postData) => ({
    type: INSERT_POST,
    payload: postData
})

export const insertPost = (name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'posts' , {
                name
            })
            .then(result => {
                dispatch(_insertPost(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _deletePosts = (postsData) => ({
    type: DELETE_POSTS,
    payload: postsData
})

export const deletePosts = (ids) => {
    return dispatch => {
        return axios
            .post(API_URL + 'posts/delete', {
                ids
            })
            .then(result => {
                dispatch(_deletePosts(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _updatePost = (postData) => ({
    type: UPDATE_POST,
    payload: postData
})

export const updatePost = (id, name) => {
    return dispatch => {
        return axios
            .post(API_URL + 'posts/update/' + id)
            .then(result => {
                dispatch(_updatePost(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const _getPotentialDeletePostProblems = (postData) => ({
    type: GET_POTENTIAL_POST_DATA_TO_DELETE,
    payload: postData
})

export const getPotentialDeletePostProblems = (id) => {
    return dispatch => {
        return axios
            .post(API_URL + 'problems/' + id)
            .then(result => {
                dispatch(_getPotentialDeletePostProblems(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
