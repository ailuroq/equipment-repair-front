import React, {useEffect, useState} from 'react';
import styles from './Devices.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getDevices} from "../../redux/actions/devices";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';


const Devices = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 160, sortable: false},
        {field: 'country', headerName: 'Страна', width: 200, sortable: false},
        {field: 'brand', headerName: 'Бренд', width: 160, sortable: false},
        {field: 'model', headerName: 'Модель', width: 140, sortable: false},
        {field: 'client', headerName: 'Клиент', witdh: 100, sortable: false},
        {
            field: 'actions',
            headerName: 'Действия',
            sortable: false,
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <ul className={styles.buttons}>
                        <li>
                            <a href={'devices/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}} />
                            </a>
                        </li>
                        <li>
                            <a href={'devices/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}} />
                            </a>
                        </li>
                        <li>
                            <a href={'clients/delete/' + params.getValue("id")}>
                                <DeleteIcon style={{color: '#4f4f4f'}} />
                            </a>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {devices} = useSelector((state) => state.devices.deviceData)
    console.log(devices)

    useEffect(() => {
        dispatch(getDevices())
    }, [dispatch])

    return (
        <div className={styles.devices}>
            <div className={styles.find}>
            </div>
            <div className={styles.table}>
                {devices &&
                <DataGrid
                    rows={devices}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25, 50, 100, 200]}
                    checkboxSelection
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />}
            </div>
        </div>

    )
}

export default Devices