import React from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getThirdQueryData} from "../../../../redux/actions/thirdQuery";

const ThirdQuery = () => {
    const [selectedDate, setSelectedDate] = React.useState(Date.now());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const dispatch = useDispatch()

    const handleSubmit = () => {
        const date = new Date(selectedDate)
        dispatch(getThirdQueryData(date.getUTCMonth()+1, date.getFullYear()))
    }
    return (
        <div>
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
        </div>
    )
}

export default ThirdQuery
