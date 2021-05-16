import React from 'react'
import styles from "./Devices.module.css";
import {Button, TextField} from "@material-ui/core";
import {updateSearchValue} from "../../redux/actions/search";
import {useDispatch, useSelector} from "react-redux";
import {findDevice} from "../../redux/actions/devices";

const DeviceFind = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindClient = () => {
        dispatch(findDevice(searchData))
    }

    return (
        <div className={styles.find_or_add}>
            <div>
                <TextField className={styles.search_item} id="search" label="Поиск названию или по марке" value={searchData}
                           onChange={handleSearchDataChange}/>
            </div>
            <div>
                <Button
                    id={styles.find_button}
                    variant="outlined"
                    color="primary"
                    onClick={handleFindClient}
                >Найти</Button>
            </div>
            <div>
                <Button id={styles.add_button} variant="outlined" color="primary"><a href={'devices/new'}>Добавить</a></Button>
            </div>
        </div>
    )
}

export default DeviceFind
