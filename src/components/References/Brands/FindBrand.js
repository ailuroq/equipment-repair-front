import React from 'react'
import styles from "./Brands.module.css"
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createBrandDialogOpen, findBrand} from "../../../redux/actions/brands";
import {updateSearchValue} from "../../../redux/actions/search";
import CreateBrand from "./CreateBrand";

const FindBrand = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindFirm = () => {
        dispatch(findBrand(searchData))
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
                    dispatch(createBrandDialogOpen())
                }}>Добавить</Button>
            </div>

            <CreateBrand/>
        </div>
    )
}

export default FindBrand
