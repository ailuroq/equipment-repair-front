import React from 'react'
import styles from "./Repairs.module.css";
import {Button, TextField} from "@material-ui/core";
import {updateSearchValue} from "../../redux/actions/search";
import {useDispatch, useSelector} from "react-redux";
import {findRepairs} from "../../redux/actions/repairs";

const RepairFind = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindRepair = () => {
        dispatch(findRepairs(searchData))
    }

    return (
        <div className={styles.find_or_add}>
            <div>
                <TextField className={styles.search_item} id="search" label="Поиск по виду работы" value={searchData}
                           onChange={handleSearchDataChange}/>
            </div>
            <div>
                <Button
                    id={styles.find_button}
                    variant="outlined"
                    color="primary"
                    onClick={handleFindRepair}
                >Найти</Button>
            </div>
            <div>
                <Button id={styles.add_button} variant="outlined" color="primary"><a href={'repairs/new'}>Добавить</a></Button>
            </div>
        </div>
    )
}

export default RepairFind
