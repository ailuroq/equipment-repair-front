import React, {useEffect, useState} from 'react'
import styles from './Brands.module.css';
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import FindBrand from './FindBrand'
import {
    deleteBrands,
    getAllBrands,
    getPotentialDeleteBrandProblems,
    updateBrand,
    updateBrandDialogOpen
} from "../../../redux/actions/brands";
import {DataGrid} from "@material-ui/data-grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {caseOfNum} from "../../common/convertCase";
import DialogActions from "@material-ui/core/DialogActions";
import {Button, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import UpdateBrand from "./UpdateBrand";

const Brands = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [brandId, setBrandId] = useState([])
    const [brandName, setBrandName] = useState('')
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
                                setBrandId(params.getValue('id'))
                                setBrandName(params.getValue('name'))
                                dispatch(updateBrandDialogOpen())
                            }}>
                                <EditTwoToneIcon
                                    style={{color: 'green'}}
                                    cursor={'pointer'}
                                />
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                setBrandId(params.getValue('id'))
                                setBrandName(params.getValue('name'))
                                handleGetPotentialProblems(params.getValue('id'))
                                handleOpenDeleteDialog()


                            }}>
                                <DeleteIcon style={{color: '#4f4f4f'}}
                                            onClick={(e) => {}}
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
    const {brands} = useSelector(state => state.brands.brandData)
    const potentialDataToDelete = useSelector(state => state.brands.potentialDataToDelete)
    const updateDialog = useSelector(state => state.brands.updateDialog)
    console.log(brands)
    const handleGetPotentialProblems = (id) => {
        dispatch(getPotentialDeleteBrandProblems(id))
    }

    useEffect(() => {
        dispatch(getAllBrands())
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
    const handleDeleteBrand = (ids) => {
        dispatch(deleteBrands(ids))
    }
    console.log(selectedRows)
    return (
        <div className={styles.brands}>
            <div className={styles.table}>
                {brands &&
                    <div>
                        {selectedRows.length !== 0 &&
                        <div className={styles.delete_many}>
                            <Button
                                onClick={handleAlertDialogOpen}
                            >Удалить выбранное</Button>
                        </div>}
                        <Dialog
                            open={deleteDialogOpen}
                            onClose={handleCloseDeleteDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    При удалении данного пользователя (id: {brandId}) могут быть удалены следующие данные: <br/>
                                    В таблице техники: {potentialDataToDelete.devices} {caseOfNum(potentialDataToDelete.devices, ['строка', 'строки', 'строк'])}<br/>
                                    В таблице заказов: {potentialDataToDelete.orders} {caseOfNum(potentialDataToDelete.orders, ['строка', 'строки', 'строк'])}<br/>
                                    В таблице работ: {potentialDataToDelete.repairs} {caseOfNum(potentialDataToDelete.repairs, ['строка', 'строки', 'строк'])}<br/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDeleteDialog} color="primary">
                                    Не удалять
                                </Button>
                                <Button onClick={()=>{
                                    handleCloseDeleteDialog()
                                    const array = []
                                    array.push(brandId)
                                    handleDeleteBrand(array)
                                }} color="primary" autoFocus>
                                    Все равно удалить
                                </Button>
                            </DialogActions>
                        </Dialog>

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
                                    handleDeleteBrand(selectedRows)
                                    window.location.reload();
                                }} color="primary" autoFocus>
                                    Все равно удалить
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <FindBrand/>
                        {updateDialog&&
                        <UpdateBrand currentValue={{id: brandId, name: brandName}}/>}
                        <DataGrid
                            rows={brands}
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

export default Brands
