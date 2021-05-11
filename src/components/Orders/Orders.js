import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../redux/actions/orders";
import styles from './Orders.module.css'
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {DataGrid} from "@material-ui/data-grid";

const Orders = () => {
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

                                        cursor={'pointer'}
                            />
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.orders.orderData)

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    return (
        <div className={styles.orders}>
            <div className={styles.table}>
                {orders &&
                <DataGrid
                    rows={orders}
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

export default Orders
