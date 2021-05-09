import React, {useEffect, useState} from 'react'
import styles from './Firms.module.css'
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {deleteFirm, getFirms, getPotentialDataToDelete} from "../../redux/actions/firms";
import {DataGrid} from "@material-ui/data-grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {caseOfNum} from "../common/convertCase";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import FirmFind from "./FirmFind";

const Firms = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [firmId, setFirmId] = useState()
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 160, sortable: false},
        {field: 'address', headerName: 'Адрес', width: 160, sortable: false},
        {field: 'phone', headerName: 'Телефон', width: 140, sortable: false},
        {field: 'city', headerName: 'Город', width: 160, sortable: false},
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
                            <a href={'firms/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'firms/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setFirmId(params.getValue("id"))
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
    const {firms} = useSelector((state) => state.firms.firmData)
    const potentialDataToDelete = useSelector(state => state.firms.potentialDataToDelete)
    console.log(potentialDataToDelete)
    console.log(firms)

    useEffect(() => {
        dispatch(getFirms())
    }, [dispatch])

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }
    const handleGetPotentialDataToDelete = (firmId) => {
        console.log(firmId)
        dispatch(getPotentialDataToDelete(firmId))
    }
    const handleDeleteFirmById = firmId => {
        const ids = []
        ids.push(firmId)
        dispatch(deleteFirm(ids))
    }

    return (
        <div className={styles.firms}>
            <div className={styles.table}>
                <FirmFind/>
                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            При удалении данного пользователя (id: {firmId}) могут быть удалены следующие данные: <br/>
                            В таблице мастеров: {potentialDataToDelete.masters} {caseOfNum(potentialDataToDelete.devices, ['строка', 'строки', 'строк'])}<br/>
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
                            handleDeleteFirmById(firmId)
                        }} color="primary" autoFocus>
                            Все равно удалить
                        </Button>
                    </DialogActions>
                </Dialog>
                {firms &&
                <DataGrid
                    rows={firms}
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

export default Firms
