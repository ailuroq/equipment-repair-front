import React, {useEffect, useState} from 'react';
import styles from './Devices.module.css'
import {useDispatch, useSelector} from "react-redux";
import {deleteDevices, getDevices, getPotentialDeviceDataToDelete} from "../../redux/actions/devices";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {caseOfNum} from "../common/convertCase";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DeviceFind from "./DeviceFind";


const Devices = () => {
    const [deviceId, setDeviceId] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
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
                            <DeleteIcon
                                style={{color: '#4f4f4f'}}
                                onClick={(e) => {
                                    setDeviceId(params.getValue('id'))
                                    handleGetPotentialDataToDelete(params.getValue('id'))
                                    handleOpenDialog()
                                }}
                                cursor={'pointer'}
                            />
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {devices} = useSelector((state) => state.devices.deviceData)
    const potentialDataToDelete = useSelector(state => state.devices.potentialDataToDelete)

    useEffect(() => {
        dispatch(getDevices())
    }, [dispatch])

    const handleGetPotentialDataToDelete = deviceId => {
        dispatch(getPotentialDeviceDataToDelete(deviceId))
    }

    const handleDeleteDeviceById = (id) => {
        const ids = []
        ids.push(id)
        dispatch(deleteDevices(ids))
    }

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    return (
        <div className={styles.devices}>
            <DeviceFind/>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        При удалении данной техники (id: {deviceId}) могут быть удалены следующие данные: <br/>
                        В таблице заказов: {potentialDataToDelete.orders} {caseOfNum(potentialDataToDelete.orders, ['строка', 'строки', 'строк'])}<br/>
                        В таблице работ: {potentialDataToDelete.repairs} {caseOfNum(potentialDataToDelete.repairs, ['строка', 'строки', 'строк'])}<br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Не удалять
                    </Button>
                    <Button onClick={()=>{
                        handleCloseDialog()
                        handleDeleteDeviceById(deviceId)
                    }} color="primary" autoFocus>
                        Все равно удалить
                    </Button>
                </DialogActions>
            </Dialog>
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
