import React, {useEffect, useState} from 'react';
import styles from './Repairs.module.css';
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import {getClients} from "../../redux/actions/clients";
import {deleteRepairs, getRepairs} from "../../redux/actions/repairs";
import RepairFind from "./RepairFind";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {caseOfNum} from "../common/convertCase";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";

const Repairs = () => {
    const [repairId, setRepairId] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)

    const [ids, setIds] = useState([])
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'receipt_number', headerName: 'Номер заказа', width: 160, sortable: false},
        {field: 'type', headerName: 'Вид работы', width: 260, sortable: false},
        {field: 'price', headerName: 'Стоимость', width: 150, sortable: false},
        {
            field: 'completion',
            headerName: 'Состояние',
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <p>{params.getValue('completion') && <div>Выполнен</div>}</p>
                    <p>{!params.getValue('completion') && <div>Не выполнен</div>}</p>
                </div>
            )

        },
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
                            <a href={'repairs/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setRepairId(params.getValue('id'))
                                            handleOpenDialog()
                                            /*setUserId(params.getValue("id"))
                                            handleGetPotentialDataToDelete(params.getValue("id"))
                                            handleOpenDialog()*/
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
    const {repairs} = useSelector(state => state.repairs.repairData)
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    console.log(repairs)
    useEffect(() => {
        dispatch(getRepairs())
    }, [dispatch])

    return (
        <div className={styles.repairs}>
            <RepairFind/>
            {selectedRows.length !== 0 &&
            <div className={styles.delete_many}>
                <Button
                    onClick={() => setAlertDialogOpen(true)}
                >Удалить выбранное</Button>
            </div>}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Действительно хотите эту работу?
                        Никакие данные не пострадают
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Не удалять
                    </Button>
                    <Button onClick={()=>{
                        handleCloseDialog()
                        const array = []
                        array.push(repairId)
                        console.log(array)
                        dispatch(deleteRepairs(array))
                    }} color="primary" autoFocus>
                        Все равно удалить
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={styles.table}>
                {repairs &&
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
                                    dispatch(deleteRepairs(selectedRows))
                                }} color="primary" autoFocus>
                                    Все равно удалить
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <DataGrid
                            rows={repairs}
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

export default Repairs
