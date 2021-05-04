import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getSecondQueryData} from "../../../../redux/actions/secondQuery";
import styles from './SecondQuery.module.css'
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const SecondQuery = () => {
    const columns1 = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},
        {field: 'name', headerName: 'Фирмы', width: 160, sortable: false},
        {field: 'avgexp', headerName: 'Средний опыт', width: 150, sortable: false}
    ]

    const dispatch = useDispatch()
    const queryData1 = useSelector(state => state.secondQuery.secondQueryData.table)
    console.log(queryData1)

    const handleSubmit1 = () => {
        dispatch(getSecondQueryData())
    }

    return (
        <div className={styles.secondQuery}>
            <h3>Второй запрос</h3>
            <div className={styles.queries}>
                <div>
                    <Button
                        onClick={handleSubmit1}
                    >
                        Найти
                    </Button>

                    {queryData1 &&
                        <DataGrid
                            rows={queryData1}
                            columns={columns1}
                            pageSize={50}
                            rowsPerPageOptions={[50, 100, 200]}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    }
                </div>
                <div>
                    <Button>
                        Найти
                    </Button>
                    <DataGrid
                        rows={query}
                    />
                </div>
            </div>
        </div>
    )
}

export default SecondQuery
