import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getFirmWithNoOrderPerPeriod} from "../../../redux/actions/queries";
import styles from "../Queries.module.css";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

const NoOrderPerPeriod = () => {
    const columns = [
        {field: 'id', headerName: 'id', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 100, sortable: false},
        {field: 'phone', headerName: 'Телефон', width: 150, sortable: false},
    ]
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const {firms} = useSelector(state => state.queries.firmData)
    console.log(firms)
    const handleFromDateChange = (date) => {
        setFrom(date)
        fieldValidation(date, to)
    }
    const handleToDateChange = date => {
        setTo(date)
        fieldValidation(from, date)
    }
    const fieldValidation = (from, to) => {
        if (new Date(from) > new Date(to)) setDisable(true)
        else setDisable(false)
    }
    useEffect(() => {
        setFrom(new Date())
        setTo(new Date())
        fieldValidation(from, to)
    }, [])
    const handleSubmit = () => {
        dispatch(getFirmWithNoOrderPerPeriod(from, to))
    }
    return (
        <div className={styles.no_order_per_period}>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Выбор даты заказа"
                            value={from}
                            onChange={handleFromDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Выбор даты выполнения"
                            value={to}
                            onChange={handleToDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
            <div className={styles.button}>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={disable}
                >Отправить</Button>
            </div>
            {firms &&
                <DataGrid
                    rows={firms}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50, 100, 200]}
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />
            }
        </div>
    )
}

export default NoOrderPerPeriod
