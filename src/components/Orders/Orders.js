import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../redux/actions/orders";
import styles from './Orders.module.css'
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {DataGrid} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const Orders = () => {
    const [selectedRows, setSelectedRows] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'receipt_number', headerName: 'Квитанция №', width: 160, sortable: false},
        {field: 'order_date', headerName: 'Дата заказа', width: 160, sortable: false},
        {
            field: 'completion_date',
            headerName: 'Дата выполнения',
            width: 160,
            sortable: false,
            renderCell: params => (
                <div>
                    <p>{params.getValue('completion_date')}</p>
                    <p>{!params.getValue('completion_date') && <div>Не выполнен</div>}</p>
                </div>
            )
        },
        {
            field: 'order_completed',
            headerName: 'Заказ выполнен',
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <p>{params.getValue('order_completed') && <div>Выполнен</div>}</p>
                    <p>{!params.getValue('order_completed') && <div>Не выполнен</div>}</p>
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
                            <a href={'orders/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'orders/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        cursor={'pointer'}
                            />
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {orders} = useSelector((state) => state.orders.orderData)
    console.log(orders)
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    return (
        <div className={styles.orders}>
            {selectedRows.length !== 0 &&
            <div className={styles.delete_many}>
                <Button
                    onClick={() => setAlertDialogOpen(true)}
                >Удалить выбранное</Button>
            </div>}
            <div className={styles.table}>
                {orders &&
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
                                }} color="primary" autoFocus>
                                    Все равно удалить
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <DataGrid
                            rows={orders}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50, 250, 500]}
                            checkboxSelection
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders
