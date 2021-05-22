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
    const [disable, setDisable] = useState(true)
    const [dateAlert, setDateAlert] = useState(false)



    const dispatch = useDispatch()
    const insertData = useSelector(state => state.orders.insertInfo)
    console.log(insertData)
    const handleOrderDateChange = (date) => {
        setOrderDate(date)
        validateFields(receiptNumber, date, completionDate, orderCompleted, deviceId, masterId)
    }
    const handleCompletionDateChange = date => {
        setCompletionDate(date)
        validateFields(receiptNumber, orderDate, date, orderCompleted, deviceId, masterId)
    }
    const handleReceiptNumberChange = (e) => {
        const receiptNumber = e.target.value;
        setReceiptNumber(receiptNumber);
        validateFields(receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId)
    }
    const handleSubmit = () => {
        dispatch(insertOrder())
    }
    const validateFields = (receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
        if (receiptNumber && orderCompleted !== null && deviceId && masterId) {
            setDisable(false)
        }
        else setDisable(true)
        if (new Date(orderDate) > new Date(completionDate)) {
            setDisable(true)
            setDateAlert(true)
        }
        else setDateAlert(false)
    }
    useEffect(() => {
        dispatch(getInsertOrderInfo())
        setOrderDate(new Date())
        setCompletionDate(new Date())
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
                                label="Выбор даты заказа"
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
                                label="Выбор даты выполнения"
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
                        <TextField
                            className={styles.text_field_item}
                            id="model"
                            label="Номер заказа"
                            type='number'
                            value={receiptNumber}
                            helperText={receiptNumber === "" ? 'Обязательное поле' : ' '}
                            onChange={handleReceiptNumberChange}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            id="name"
                            className={styles.combo_box}
                            options={insertData.masters}
                            autoHighlight
                            disableClearable
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id + ' ' +option.firstname}
                            onChange={(e, value) => {
                                if (value) {
                                    setMasterId(value.id)
                                    validateFields(receiptNumber, orderDate, completionDate, orderCompleted, deviceId, value.id)
                                }
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
                            disableClearable
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id + ' ' + option.name}
                            onChange={(e, value) => {
                                if (value) {
                                    setDeviceId(value.id)
                                    validateFields(receiptNumber, orderDate, completionDate, orderCompleted, value.id, masterId)
                                }
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
                           disableClearable
                           style={{ width: 200 }}
                           getOptionLabel={(option) => option.ready}
                           onChange={(e, value) => {
                               if (value) {
                                   let ready
                                   if (value.ready === 'Готов') ready = true
                                   if (value.ready === 'Не готов') ready = false
                                   setReady(ready)
                                   validateFields(receiptNumber, orderDate, completionDate, ready, deviceId, masterId)
                               }
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
                {dateAlert && <p>Дата заказа должна быть меньше, чем дата выполнения</p>}
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
