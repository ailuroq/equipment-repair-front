import React, {useEffect, useState} from 'react'
import styles from './Cities.module.css'
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
import UpdateCity from "./UpdateCity";
import {
    deleteCities,
    getAllCities,
    getPotentialDeleteCityProblems,
    updateCityDialogOpen
} from "../../../redux/actions/cities";
import FindCity from "./FindCity";

const Cities = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [cityId, setCityId] = useState([])
    const [cityName, setCityName] = useState('')
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
                                setCityId(params.getValue('id'))
                                setCityName(params.getValue('name'))
                                dispatch(updateCityDialogOpen())
                            }}>
                                <EditTwoToneIcon
                                    style={{color: 'green'}}
                                    cursor={'pointer'}
                                />
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                setCityId(params.getValue('id'))
                                handleGetPotentialProblems(params.getValue('id'))
                                handleOpenDeleteDialog()


                            }}>
                                <DeleteIcon style={{color: '#4f4f4f'}}
                                            onClick={(e) => {
                                                setCityId(params.getValue('id'))
                                                setCityName(params.getValue('name'))
                                                handleGetPotentialProblems(cityId)
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
    const {cities} = useSelector(state => state.cities.cityData)
    const potentialDataToDelete = useSelector(state => state.cities.potentialDataToDelete.problems)
    console.log(potentialDataToDelete)
    const updateDialog = useSelector(state => state.cities.updateDialog)
    const handleGetPotentialProblems = (id) => {
        console.log(id)
        dispatch(getPotentialDeleteCityProblems(id))
    }

    useEffect(() => {
        dispatch(getAllCities())
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
    const handleDeleteCity = (ids) => {
        dispatch(deleteCities(ids))
    }
    console.log(selectedRows)
    return (
        <div className={styles.cities}>
            <div className={styles.table}>
                <FindCity/>
                {cities &&
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
                                При удалении данного города (id: {cityId}) могут быть удалены следующие данные: <br/>
                                В таблице фирм: {potentialDataToDelete.firm} {caseOfNum(potentialDataToDelete.firm, ['строка', 'строки', 'строк'])}<br/>
                                В таблице мастеров: {potentialDataToDelete.master} {caseOfNum(potentialDataToDelete.master, ['строка', 'строки', 'строк'])}<br/>
                                В таблице работ: {potentialDataToDelete.repair} {caseOfNum(potentialDataToDelete.repair, ['строка', 'строки', 'строк'])}<br/>
                                В таблице заказов: {potentialDataToDelete.order} {caseOfNum(potentialDataToDelete.order, ['строка', 'строки', 'строк'])}<br/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog} color="primary">
                                Не удалять
                            </Button>
                            <Button onClick={()=>{
                                handleCloseDeleteDialog()
                                const array = []
                                array.push(cityId)
                                handleDeleteCity(array)
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
                                Вы действительно хотите удалить выбранные данные? Могут пострадать невинные
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleAlertDialogClose} color="primary">
                                Не удалять
                            </Button>
                            <Button onClick={()=>{
                                handleAlertDialogClose()
                                handleDeleteCity(selectedRows)
                            }} color="primary" autoFocus>
                                Все равно удалить
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {updateDialog&&
                    <UpdateCity currentValue={{id: cityId, name: cityName}}/>}
                    <DataGrid
                        rows={cities}
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

export default Cities
