import React, {useEffect, useState} from 'react'
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {useDispatch, useSelector} from "react-redux";
import {getInsertOrderInfo, insertOrder} from "../../../redux/actions/orders";
import styles from './NewOrder.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";

const NewOrder = () => {
    const [receiptNumber, setReceiptNumber] = useState()
    const [orderDate, setOrderDate] = useState()
    const [completionDate, setCompletionDate] = useState()
    const [orderCompleted, setOrderCompleted] = useState(false)
    const [deviceId, setDeviceId] = useState()
    const [masterId, setMasterId] = useState()
    const [ready, setReady] = useState()
    const [disable, setDisable] = useState()


    const dispatch = useDispatch()
    const insertData = useSelector(state => state.orders.insertInfo)
    console.log(insertData)
    const handleOrderDateChange = (date) => {
        setOrderDate(date)
    }
    const handleCompletionDateChange = date => {
        setCompletionDate(date)
    }
    const handleOrderCompletedChange = data => {
        setOrderCompleted(data)
    }
    const handleDeviceChange = id => {
        setDeviceId(id)
    }
    const handleMasterChange = id => {
        setMasterId(id)
    }
    const handleSubmit = () => {
        dispatch(insertOrder())
    }

    useEffect(() => {
        dispatch(getInsertOrderInfo())
    }, [dispatch])

    return (
        <div>
            {insertData &&
            <div>
                <div>
                    <h2>Добавить заказ</h2>
                </div>
                <div></div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Выбор даты"
                                value={orderDate}
                                onChange={handleOrderDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Выбор даты"
                                value={completionDate}
                                onChange={handleCompletionDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className={styles.autocompletes}>
                    <div>
                        <Autocomplete
                            id="name"
                            className={styles.combo_box}
                            options={insertData.masters}
                            autoHighlight
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id + ' ' +option.firstname}
                            onChange={(e, value) => {
                                if (value) setMasterId(value.id)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Выберите мастера"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            id="name"
                            className={styles.combo_box}
                            options={insertData.devices}
                            autoHighlight
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id + ' ' + option.name}
                            onChange={(e, value) => {
                                if (value) setDeviceId(value.id)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Выберите технику"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                    </div>
                   <div>
                       <Autocomplete
                           id="name"
                           className={styles.combo_box}
                           options={[
                               {ready: 'Готов'},
                               {ready: 'Не готов'}
                           ]}
                           autoHighlight
                           style={{ width: 200 }}
                           getOptionLabel={(option) => option.ready}
                           onChange={(e, value) => {
                               if (value) setReady(value.ready)
                           }}
                           renderInput={(params) => (
                               <TextField
                                   {...params}
                                   label="Готовность заказа"
                                   variant="outlined"
                                   inputProps={{
                                       ...params.inputProps,
                                       autoComplete: 'new-password',
                                   }}
                               />
                           )}
                       />
                   </div>
                </div>
                <div className={styles.insert_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                        disabled={disable}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default NewOrder
