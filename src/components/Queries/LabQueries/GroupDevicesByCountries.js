import React from 'react'
import styles from "../Queries.module.css";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {groupDevicesByCountries} from "../../../redux/actions/queries";

const GroupDevicesByCountries = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 150, sortable: false},
        {field: 'model', headerName: 'Модель', width: 200, sortable: false},
        {field: 'country', headerName: 'Страна', width: 200, sortable: false},
        {field: 'brand', headerName: 'Марка', width: 200, sortable: false},
        {field: 'name', headerName: 'Название', width: 200, sortable: false},
    ]
    const dispatch = useDispatch()
    const {devices} = useSelector(state => state.queries.deviceData)
    console.log(devices)
    const handleSubmit = () => {
        dispatch(groupDevicesByCountries())
    }
    return (
        <div>
            <div className={styles.group_devices_by_countries}>
                <div>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >Получить</Button>
                </div>
                {devices &&
                <div>
                    <DataGrid
                        rows={devices}
                        columns={columns}
                        pageSize={50}
                        rowsPerPageOptions={[50, 100, 200]}
                        autoHeight={true}
                        disableSelectionOnClick={true}
                    />
                </div>}
            </div>
        </div>
    )
}

export default GroupDevicesByCountries
