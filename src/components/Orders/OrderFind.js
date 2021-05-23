import React from 'react'
import styles from './Orders.module.css'
import {useDispatch, useSelector} from "react-redux";
import {updateSearchValue} from "../../redux/actions/search";
import {findOrder, getOrders} from "../../redux/actions/orders";
import {Button, TextField} from "@material-ui/core";

const OrderFind = () => {
    const dispatch = useDispatch()
    const searchData = useSelector(state => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindOrder = () => {
        if (!searchData) dispatch(getOrders())
        dispatch(findOrder(searchData))
    }
    return (
        <div className={styles.find_or_add}>
            <div>
                <TextField className={styles.search_item} id="search" label="Поиск по номеру или состоянию" value={searchData}
                           onChange={handleSearchDataChange}/>
            </div>
            <div>
                <Button
                    id={styles.find_button}
                    variant="outlined"
                    color="primary"
                    onClick={handleFindOrder}
                >Найти</Button>
            </div>
            <div>
                <Button id={styles.add_button} variant="outlined" color="primary"><a href={'orders/new'}>Добавить</a></Button>
            </div>
        </div>
    )
}

export default OrderFind
