import React from 'react'
import styles from "../Queries.module.css";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {getMastersMoreAvgExp} from "../../../redux/actions/queries";

const MoreThanAvgExp = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 150, sortable: false},
        {field: 'avgexp', headerName: 'Средний возраст', width: 200, sortable: false},
        {field: 'name', headerName: 'Название фирм', width: 200, sortable: false},
    ]
    const handleSubmit = () => {
        dispatch(getMastersMoreAvgExp())
    }
    const dispatch = useDispatch()
    const firms = useSelector(state => state.queries.masterData)
    console.log(firms)
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

export default MoreThanAvgExp
