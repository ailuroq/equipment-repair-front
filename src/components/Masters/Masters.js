import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from "@material-ui/core";
import {caseOfNum} from "../common/convertCase";
import styles from './Masters.module.css'
import MastersFind from "./MastersFind";
import {deleteMaster, getMasters, getPotentialDataToDelete} from "../../redux/actions/masters";

const Masters = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [masterId, setMasterId] = useState()
    const [selectedRows, setSelectedRows] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'lastname', headerName: 'Фамилия', width: 160, sortable: false},
        {field: 'firstname', headerName: 'Имя', width: 160, sortable: false},
        {field: 'middlename', headerName: 'Отчество', width: 160, sortable: false},
        {field: 'experience', headerName: 'Опыт(лет)', width: 120, sortable: false},
        {field: 'firm', headerName: 'Фирма', width: 120, sortable: false},
        {field: 'post', headerName: 'Опыт работы', width: 140, sortable: false},
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
                            <a href={'masters/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'masters/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setMasterId(params.getValue("id"))
                                            handleGetPotentialDataToDelete(masterId)
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
    const {masters} = useSelector((state) => state.masters.masterData)
    const potentialDataToDelete = useSelector(state => state.masters.problems.problems)
    console.log(potentialDataToDelete)
    const handleDeleteMasterById = (id) => {
        dispatch(deleteMaster(id))
    }
    const handleGetPotentialDataToDelete = (masterId) => {
        dispatch(getPotentialDataToDelete(masterId))
    }
    useEffect(() => {
        dispatch(getMasters())
    }, [dispatch])

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    return (
        <div className={styles.masters}>
            {potentialDataToDelete &&

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        При удалении данного пользователя (id: {masterId}) могут быть удалены следующие данные: <br/>
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
                        const array = []
                        array.push(masterId)
                        console.log(array)
                        handleDeleteMasterById(array)
                    }} color="primary" autoFocus>
                        Все равно удалить
                    </Button>
                </DialogActions>
            </Dialog>}
            <MastersFind/>
            {selectedRows.length !== 0 &&
            <div className={styles.delete_many}>
                <Button
                    onClick={() => setAlertDialogOpen(true)}
                >Удалить выбранное</Button>
            </div>}
            <div className={styles.table}>
                {masters &&
                    <div>
                        <Dialog
                            open={alertDialogOpen}
                            onClose={() => setAlertDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Вы действительно хотите удалить выбранные данные? Могут пострадать невинные
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setAlertDialogOpen(false)} color="primary">
                                    Не удалять
                                </Button>
                                <Button onClick={()=>{
                                    setAlertDialogOpen(false)
                                    console.log(selectedRows)
                                    handleDeleteMasterById(selectedRows)
                                }} color="primary" autoFocus>
                                    Все равно удалить
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <DataGrid
                            rows={masters}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50, 250, 500]}
                            checkboxSelection
                            onSelectionModelChange={(GridSelectionModelChangeParams) => {
                                // This will return {selections: [selected row indexes]}
                                console.log(GridSelectionModelChangeParams);
                                if (Array.isArray(GridSelectionModelChangeParams.selectionModel)) {
                                    // Iterate the selection indexes:
                                    setSelectedRows([])
                                    GridSelectionModelChangeParams.selectionModel.forEach(
                                        // Get the row data:
                                        (selection_index) => setSelectedRows(selectedRows =>[...selectedRows, Number(selection_index)] )
                                    );
                                }
                            }}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                }
            </div>
        </div>

    )
}

export default Masters
