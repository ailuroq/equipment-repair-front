import React from 'react'
import styles from './Orders.module.css'
import {useDispatch, useSelector} from "react-redux";
import {updateSearchValue} from "../../redux/actions/search";

const OrderFind = () => {
    const dispatch = useDispatch()
    const searchData = useSelector(state => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindOrder = () => {
        dispatch(findOrder(searchData))
    }
}
