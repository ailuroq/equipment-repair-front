import {UPDATE_SEARCH_VALUE} from "./types";


export const updateSearchValue = (searchValue) => ({
    type: UPDATE_SEARCH_VALUE,
    payload: searchValue
})