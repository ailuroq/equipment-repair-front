import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getUpdateOrderInfo, updateOrder} from "../../../redux/actions/orders";
import styles from './EditOrder.module.css';
import {Button, TextField} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {Autocomplete} from "@material-ui/lab";


const EditOrder = () => {
    const {id} = useParams()
    const [receiptNumber, setReceiptNumber] = useState()
    const [orderDate, setOrderDate] = useState(new Date())
    const [completionDate, setCompletionDate] = useState(new Date())
    const [deviceId, setDeviceId] = useState()
    const [masterId, setMasterId] = useState()
    const [orderCompleted, setOrderCompleted] = useState()
    const [disable, setDisable] = useState(true)
    const [dateAlert, setDateAlert] = useState(false)

    const dispatch = useDispatch()
    const updateInfo = useSelector(state => state.orders.updateInfo)
    console.log(updateInfo)
    useEffect(() => {
        dispatch(getUpdateOrderInfo(id))
    }, [id, dispatch])

    useEffect(() => {
        if (updateInfo.current) {
            setReceiptNumber(updateInfo.current.receipt_number)
            setOrderDate(updateInfo.current.order_date)
            setCompletionDate(updateInfo.current.completion_date)
            setDeviceId(updateInfo.current.device_id)
            setMasterId(updateInfo.current.master_id)
            setOrderCompleted(updateInfo.current.order_completed)
        }
    }, [updateInfo])

    const handleReceiptNumberChange = (e) => {
        const receiptNumber = e.target.value;
        setReceiptNumber(receiptNumber);
        fieldValidation(receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId)
    }
    const handleOrderDateChange = (date) => {
        setOrderDate(date)
        fieldValidation(receiptNumber, date, completionDate, orderCompleted, deviceId, masterId)
    }
    const handleCompletionDateChange = (date) => {
        setCompletionDate(date)
        fieldValidation(receiptNumber, orderDate, date, orderCompleted, deviceId, masterId)
    }
    const fieldValidation = (receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId) => {
        debugger
        if (Number(receiptNumber) === updateInfo.current.receipt_number
        && new Date(orderDate).getTime() === new Date(updateInfo.current.order_date).getTime()
        && new Date(completionDate).getTime() === new Date(updateInfo.current.completion_date).getTime()
        && deviceId === updateInfo.current.device_id
        && masterId === updateInfo.current.master_id
        && orderCompleted === updateInfo.current.order_completed) setDisable(true)
        else setDisable(false)
        if (completionDate !== 'null') {
            if (new Date(orderDate) > new Date(completionDate)) {
                setDisable(true)
                setDateAlert(true)
            }
            else setDateAlert(false)
        }
    }

    const handleSubmit = () => {
        if (!orderCompleted) setCompletionDate(null)
        dispatch(updateOrder(id, receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId))
    }
    return (
        <div>
            {updateInfo.current &&
            <div className={styles.forms}>
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
                        id="devices"
                        className={styles.combo_box}
                        options={updateInfo.devices}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setDeviceId(value.id)
                                console.log(deviceId)
                                fieldValidation(receiptNumber, orderDate, completionDate, orderCompleted, value.id, masterId)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={updateInfo.current.device_id + ' ' + updateInfo.current.device}
                                helperText='Марка'
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
                        id="masters"
                        className={styles.combo_box}
                        options={updateInfo.masters}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.lastname}
                        onChange={(e, value) => {
                            if (value) {
                                setMasterId(value.id)
                                fieldValidation(receiptNumber, orderDate, completionDate, orderCompleted, deviceId, value.id)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={updateInfo.current.master_id + ' ' + updateInfo.current.master}
                                helperText='Мастер'
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
                </div>
                {orderCompleted === true &&
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
                                value={completionDate}
                                onChange={handleCompletionDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>}
                <div>
                    <Autocomplete
                        id="masters"
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
                                let ready;
                                if (value.ready === 'Готов') ready = true
                                if (value.ready === 'Не готов') ready = false
                                setOrderCompleted(ready)
                                fieldValidation(receiptNumber, orderDate, completionDate, ready, deviceId, masterId)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={updateInfo.current.order_completed && 'Готов' || !updateInfo.current.order_completed && 'Не готов'}
                                helperText='Готовность'
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>
            </div>}
            {dateAlert && <p>Дата заказа должна быть меньше, чем дата выполнения</p>}
            <div>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={disable}
                >Отправить</Button>
            </div>
        </div>
    )
}

export default EditOrder
