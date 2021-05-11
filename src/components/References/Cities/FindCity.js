import React from 'react'
import styles from './Cities.module.css'
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateSearchValue} from "../../../redux/actions/search";
import {createCityDialogOpen, findCity} from "../../../redux/actions/cities";
import CreateCity from "./CreateCity";

const FindCity = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindFirm = () => {
        dispatch(findCity(searchData))
    }

    return (
        <div className={styles.find_or_add}>
            <div>
                <TextField className={styles.search_item} id="search" label="Поиск" value={searchData}
                           onChange={handleSearchDataChange}/>
            </div>
            <div>
                <Button
                    id={styles.find_button}
                    variant="outlined"
                    color="primary"
                    onClick={handleFindFirm}
                >Найти</Button>
            </div>
            <div>
                <Button id={styles.add_button} variant="outlined" color="primary" onClick={() => {
                    dispatch(createCityDialogOpen())
                }}>Добавить</Button>
            </div>

            <CreateCity/>
        </div>
    )
}

export default FindCity
