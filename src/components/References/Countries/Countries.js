import React, {useEffect, useState} from 'react'
import styles from './Countries.module.css'
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {caseOfNum} from "../../common/convertCase";
import DialogActions from "@material-ui/core/DialogActions";
import {Button, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import UpdateCountry from "./UpdateCountry";
import {
    deleteCountries,
    getAllCountries,
    getPotentialDeleteCountryProblems,
    updateCountryDialogOpen
} from "../../../redux/actions/countries";
import FindCountry from "./FindCountry";

const Countries = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [countryId, setCountryId] = useState([])
    const [countryName, setCountryName] = useState('')
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 160, sortable: false},
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
                            <a onClick={() => {
                                setCountryId(params.getValue('id'))
                                setCountryName(params.getValue('name'))
                                dispatch(updateCountryDialogOpen())
                            }}>
                                <EditTwoToneIcon
                                    style={{color: 'green'}}
                                    cursor={'pointer'}
                                />
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                setCountryId(params.getValue('id'))
                                handleGetPotentialProblems(params.getValue('id'))
                                handleOpenDeleteDialog()


                            }}>
                                <DeleteIcon style={{color: '#4f4f4f'}}
                                            onClick={(e) => {
                                                setCountryId(params.getValue('id'))
                                                setCountryName(params.getValue('name'))
                                                handleGetPotentialProblems(countryId)
                                                handleOpenDeleteDialog()
                                            }}
                                            cursor={'pointer'}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {countries} = useSelector(state => state.countries.countryData)
    const potentialDataToDelete = useSelector(state => state.countries.potentialDataToDelete.problems)
    console.log(potentialDataToDelete)
    const updateDialog = useSelector(state => state.countries.updateDialog)
    const handleGetPotentialProblems = (id) => {
        console.log(id)
        dispatch(getPotentialDeleteCountryProblems(id))
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    const handleAlertDialogOpen = () => {
        setAlertDialogOpen(true)
    }
    const handleAlertDialogClose = () => {
        setAlertDialogOpen(false)
    }
    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
    }
    const handleDeleteCountry = (ids) => {
        dispatch(deleteCountries(ids))
    }
    console.log(selectedRows)
    return (
        <div className={styles.countries}>
            <div className={styles.table}>
                <FindCountry/>
                {countries &&
                <div>
                    {selectedRows.length !== 0 &&
                    <div className={styles.delete_many}>
                        <Button
                            onClick={handleAlertDialogOpen}
                        >Удалить выбранное</Button>
                    </div>}
                    {potentialDataToDelete &&
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                При удалении данной страны (id: {countryId}) могут быть удалены следующие данные: <br/>
                                В таблице техники: {potentialDataToDelete.devices} {caseOfNum(potentialDataToDelete.firm, ['строка', 'строки', 'строк'])}<br/>
                                В таблице заказов: {potentialDataToDelete.orders} {caseOfNum(potentialDataToDelete.master, ['строка', 'строки', 'строк'])}<br/>
                                В таблице работ: {potentialDataToDelete.repairs} {caseOfNum(potentialDataToDelete.repair, ['строка', 'строки', 'строк'])}<br/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog} color="primary">
                                Не удалять
                            </Button>
                            <Button onClick={()=>{
                                handleCloseDeleteDialog()
                                const array = []
                                array.push(countryId)
                                handleDeleteCountry(array)
                            }} color="primary" autoFocus>
                                Все равно удалить
                            </Button>
                        </DialogActions>
                    </Dialog>
                    }
                    <Dialog
                        open={alertDialogOpen}
                        onClose={handleAlertDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Вы действительно хотите удалить выбранные данные?
                                Может произойти нежелательное удаление в таблицах: техники, заказов, работ
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleAlertDialogClose} color="primary">
                                Не удалять
                            </Button>
                            <Button onClick={()=>{
                                handleAlertDialogClose()
                                handleDeleteCountry(selectedRows)
                            }} color="primary" autoFocus>
                                Все равно удалить
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {updateDialog&&
                    <UpdateCountry currentValue={{id: countryId, name: countryName}}/>}
                    <DataGrid
                        rows={countries}
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

export default Countries
