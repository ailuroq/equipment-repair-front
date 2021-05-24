import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getSecondQueryData, getSecondQueryData2} from "../../../../redux/actions/secondQuery";
import styles from './SecondQuery.module.css'
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import ExportCSV from "../../ExportCSV";

const SecondQuery = () => {
    const columns1 = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},
        {field: 'name', headerName: 'Фирмы', width: 160, sortable: false},
        {field: 'avgexp', headerName: 'Средний опыт', width: 150, sortable: false}
    ]
    const columns2 = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},+
        {field: 'avgexp', headerName: 'Средний опыт', width: 150, sortable: false}
    ]

    const dispatch = useDispatch()
    const queryData = useSelector(state => state.secondQuery.secondQueryData)
    console.log(queryData)

    const handleSubmit = () => {
        dispatch(getSecondQueryData())
    }

    return (
        <div className={styles.secondQuery}>
            <h3>Второй запрос</h3>
            <Button
                onClick={handleSubmit}
            >
                Найти
            </Button>
            <div className={styles.queries}>
                <div>
                    {queryData.table &&
                    <div>
                        <ExportCSV csvData={queryData.table} filename='secondQueryExport'/>
                        <DataGrid
                            rows={queryData.table}
                            columns={columns1}
                            pageSize={50}
                            rowsPerPageOptions={[50, 100, 200]}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                    }
                </div>
                <div>
                    {queryData.avg &&
                        <div>
                            <p>Средний возраст работников по всем мастерским</p>
                            <p>{queryData.avg}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SecondQuery
