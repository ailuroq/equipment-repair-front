import React from 'react'
import styles from "./Firms.module.css";
import {Button, TextField} from "@material-ui/core";
import {updateSearchValue} from "../../redux/actions/search";
import {useDispatch, useSelector} from "react-redux";
import {findFirm} from "../../redux/actions/firms";

const FirmFind = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindFirm = () => {
        dispatch(findFirm(searchData))
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
                <Button id={styles.add_button} variant="outlined" color="primary"><a href={'firms/new'}>Добавить</a></Button>
            </div>
        </div>
    )
}

export default FirmFind
