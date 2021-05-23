import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getCountOrdersPerFirm} from "../../../redux/actions/queries";
import styles from "../Queries.module.css";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const CountOrdersPerFirm = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 150, sortable: false},
        {field: 'count', headerName: 'Количество заказов', width: 200, sortable: false},
        {field: 'name', headerName: 'Название фирм', width: 200, sortable: false},
    ]
    const dispatch = useDispatch()
    const {firms} = useSelector(state => state.queries.firmData)
    console.log(firms)
    const handleSubmit = () => {
        dispatch(getCountOrdersPerFirm())
    }
    return (
        <div>
            <div className={styles.count_orders_per_firm}>
                <div>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >Получить</Button>
                </div>
                {firms &&
                <div>
                    <DataGrid
                        rows={firms}
                        columns={columns}
                        pageSize={50}
                        rowsPerPageOptions={[50, 100, 200]}
                        autoHeight={true}
                        disableSelectionOnClick={true}
                    />
                </div>}
            </div>
        </div>
    )
}

export default CountOrdersPerFirm
