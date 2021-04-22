import React, {useEffect, useState} from 'react';
import styles from './Clients.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getClients, deleteClient, getPotentialDataToDelete} from "../../redux/actions/clients";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, TextField} from "@material-ui/core";
import {caseOfNum} from "../common/convertCase";
import {updateSearchValue} from "../../redux/actions/search";
import ClientFind from "./ClientFind";


const Clients = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [userId, setUserId] = useState()
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'lastname', headerName: 'Фамилия', width: 160, sortable: false},
        {field: 'firstname', headerName: 'Имя', width: 160, sortable: false},
        {field: 'middlename', headerName: 'Отчество', width: 160, sortable: false},
        {field: 'phone', headerName: 'Телефон', width: 140, sortable: false},
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
                            <a href={'clients/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'clients/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setUserId(params.getValue("id"))
                                            handleGetPotentialDataToDelete(params.getValue("id"))
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
    const {clients} = useSelector((state) => state.clients.clientData)
    const potentialDataToDelete = useSelector((state) => state.clients.potentialDataToDelete)

    console.log(clients)
    console.log(potentialDataToDelete)

    const handleDeleteClientById = (id) => {
        dispatch(deleteClient(id))
    }
    const handleGetPotentialDataToDelete = (userId) => {
        dispatch(getPotentialDataToDelete(userId))
    }
    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }


    return (
        <div className={styles.clients}>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        При удалении данного пользователя (id: {userId}) могут быть удалены следующие данные: <br/>
                        В таблице техники: {potentialDataToDelete.devices} {caseOfNum(potentialDataToDelete.devices, ['строка', 'строки', 'строк'])}<br/>
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
                        handleDeleteClientById(userId)
                    }} color="primary" autoFocus>
                        Все равно удалить
                    </Button>
                </DialogActions>
            </Dialog>
            <ClientFind/>
            <div className={styles.table}>
                {clients &&
                <DataGrid
                    rows={clients}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50, 250, 500]}
                    checkboxSelection
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />}
            </div>
        </div>

    )
}

export default Clients