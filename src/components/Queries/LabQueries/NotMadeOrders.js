import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {getListNotMadeOrders} from "../../../redux/actions/queries";
import {DataGrid} from "@material-ui/data-grid";
import styles from '../Queries.module.css'

const NotMadeOrders = () => {
    const columns = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},
        {field: 'receipt_number', headerName: '№ квитанции', width: 100, sortable: false},
        {field: 'order_date', headerName: 'Дата заказа', width: 150, sortable: false},
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
        {field: 'name', headerName: 'Название техники', width: 150, sortable: false},
    ]
    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.queries.orderData)
    console.log(orders)
    const handleSubmit = () => {
        dispatch(getListNotMadeOrders())
    }
    return (
        <div className={styles.not_made_orders}>
            <div>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                >Получить</Button>
            </div>
            {orders &&
            <div>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50, 100, 200]}
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />
            </div>}
        </div>
    )
}

export default NotMadeOrders
