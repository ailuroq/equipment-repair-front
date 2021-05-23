import React, {useEffect, useState} from 'react'
import styles from './ViewFirm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getFirmForView} from "../../../redux/actions/firms";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {Button} from "@material-ui/core";
import {countFirmOrdersPerPeriod} from "../../../redux/actions/queries";

const ViewFirm = () => {
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [disable, setDisable] = useState(true)

    const {id} = useParams()
    const dispatch = useDispatch()
    const firm = useSelector(state => state.firms.firmData.firm)
    const count = useSelector(state => state.firms.firmData.count)
    const countOrdersPerPeriod = useSelector(state => state.queries.ex.orders)
    console.log(countOrdersPerPeriod)
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
    console.log(firm)
    useEffect(() => {
        dispatch(getFirmForView(id))
    }, [dispatch, id])

    const handleSubmit = () => {
        dispatch(countFirmOrdersPerPeriod(from, to, id))
    }
    return (
        <div className={styles.view_firm}>
            {firm &&
            <div>
                <h2>Информация о фирме</h2>
                <p>Название: {firm.name}</p>
                <p>Адрес: {firm.address}</p>
                <p>Телефон: {firm.phone}</p>
                <p>Город: {firm.city}</p>
                <p>Количество заказов у данной фирмы: {count.count}</p>
            </div>
            }
            <div>
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
                <div className={styles.button}>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={disable}
                    >Отправить</Button>
                </div>
                {countOrdersPerPeriod &&
                <div>
                    <p>Количество заказов за данный период: {countOrdersPerPeriod.orders}</p>
                </div>}
            </div>
        </div>
    )
}

export default ViewFirm
