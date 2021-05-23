import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {groupRepairsByType} from "../../../redux/actions/queries";
import styles from "../Queries.module.css";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const GroupRepairsByType = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 150, sortable: false},
        {
            field: 'completion',
            headerName: 'Состояние',
            width: 200,
            sortable: false,
            renderCell: params => (
                <div>
                    <p>{params.getValue('completion') && <div>Выполнена</div>}</p>
                    <p>{!params.getValue('completion') && <div>Не выполнена</div>}</p>
                </div>
            )
        },
        {field: 'price', headerName: 'Цена', width: 200, sortable: false},
        {field: 'type', headerName: 'Тип работы', width: 200, sortable: false},
    ]
    const dispatch = useDispatch()
    const {repairs} = useSelector(state => state.queries.repairData)
    console.log(repairs)
    const handleSubmit = () => {
        dispatch(groupRepairsByType())
    }
    return (
        <div>
            <div className={styles.group_repairs_by_type}>
                <div>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >Получить</Button>
                </div>
                {repairs &&
                <div>
                    <DataGrid
                        rows={repairs}
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

export default GroupRepairsByType
