import React, {useEffect, useState} from 'react'
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getDoneMasterOrdersPerPeriod, getMasterOrdersPerPeriod} from "../../../redux/actions/queries";
import {useDispatch, useSelector} from "react-redux";
import {getMasters} from "../../../redux/actions/masters";
import styles from '../Queries.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {DataGrid} from "@material-ui/data-grid";

const DoneMasterOrdersPerPeriod = () => {
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
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [masterId, setMasterId] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()

    const {masters} = useSelector(state => state.masters.masterData)
    const resultDone = useSelector(state => state.queries.orderData.resultDone)
    const resultNotDone = useSelector(state => state.queries.orderData.resultNotDone)
    const handleFromDateChange = (date) => {
        setFrom(date)
        fieldValidation(date, to, masterId)
    }
    const handleToDateChange = date => {
        setTo(date)
        fieldValidation(from, date, masterId)
    }
    const fieldValidation = (from, to, masterId) => {
        if (from && to && masterId) setDisable(false)
        else setDisable(true)
        if (new Date(from) > new Date(to)) setDisable(true)
    }
    useEffect(() => {
        dispatch(getMasters())
        setFrom(new Date())
        setTo(new Date())
    }, [dispatch])

    const handleSubmit = () => {
        console.log(from, to, masterId)
        dispatch(getMasterOrdersPerPeriod(from, to, masterId))
    }
    return (
        <div>
            <div className={styles.master_orders}>
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
                {masters &&
                <div>
                    <Autocomplete
                        id="brands"
                        className={styles.combo_box}
                        options={masters}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.lastname}
                        onChange={(e, value) => {
                            if (value) {
                                setMasterId(value.id)
                                fieldValidation(from, to, value.id)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Выберите мастера'
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>}
            </div>
            <div className={styles.button}>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={disable}
                >Отправить</Button>
            </div>
            {resultDone && resultNotDone &&
                <div className={styles.masters_result}>
                    <div className={styles.master_result_item}>
                        <h3>Выполненные работы мастера</h3>
                        <DataGrid
                            rows={resultDone}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50, 100, 200]}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                    <div className={styles.master_result_item}>
                        <h3>Невыполненные работы мастера</h3>
                        <DataGrid
                            rows={resultNotDone}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50, 100, 200]}
                            autoHeight={true}
                            disableSelectionOnClick={true}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default DoneMasterOrdersPerPeriod
