import React from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getThirdQueryData} from "../../../../redux/actions/thirdQuery";
import {DataGrid} from "@material-ui/data-grid";
import styles from './ThirdQuery.module.css'
import ExportCSV from "../../ExportCSV";

const ThirdQuery = () => {
    const [selectedDate, setSelectedDate] = React.useState(Date.now());
    const columns = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},
        {field: 'name', headerName: 'Фирмы', width: 160, sortable: false},
        {field: 'works', headerName: 'Работы', width: 160, sortable: false},
        {field: 'sum', headerName: 'Сумма', width: 160, sortable: false},
    ]

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const dispatch = useDispatch()
    const queryData = useSelector(state => state.thirdQuery.thirdQueryData.table)
    console.log(queryData)
    const handleSubmit = () => {
        const date = new Date(selectedDate)
        dispatch(getThirdQueryData(date.getUTCMonth()+1, date.getFullYear()))
    }
    return (
        <div className={styles.thirdQuery}>
            <h3>Третий запрос</h3>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Выбор даты"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button
                color="primary"
                autoFocus
                onClick={handleSubmit}
            >
                Найти
            </Button>
            <div>
                {queryData &&
                    <div>
                        <ExportCSV csvData={queryData} filename='thirdQueryExport'/>
                        <DataGrid
                            rows={queryData}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50, 250, 500]}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ThirdQuery
