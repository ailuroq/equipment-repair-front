import React, {useEffect, useState} from 'react'
import {firstQuery, getFirstQueryInfo} from "../../../../redux/actions/FirstQuery";
import {useDispatch, useSelector} from "react-redux";
import styles from './FirstQuery.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {DataGrid} from "@material-ui/data-grid";
import ExportCSV from "../../ExportCSV";

const FirstQuery = () => {
    const [firmId, setFirmId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const queryInfo = useSelector(state => state.firstQuery.queryInfo.firms)
    const queryData = useSelector(state => state.firstQuery.queryData)
    console.log(queryData)

    useEffect(() => {
        dispatch(getFirstQueryInfo())
    }, [dispatch])

    const handleSubmit = () => {
        console.log(firmId)
        dispatch(firstQuery(firmId))
    }
    return (
        <div>
            <div className={styles.form}>
                <Autocomplete
                    id="firms"
                    className={styles.combo_box}
                    options={queryInfo}
                    autoHighlight
                    disableClearable
                    style={{ width: 200 }}
                    getOptionLabel={(option) => option.id + ' ' + option.name}
                    onChange={(e, value) => {
                        if (value) {
                            setFirmId(value.id)
                            setDisable(false)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText='Выбрать фирму'
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </div>
            <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disabled={disable}
            >Отправить</Button>
            {queryData.brands && queryData.secondBrands &&
            <div className={styles.result}>
                <div>
                    <p>Самые некачественные марки по выбранной фирме</p>
                    <p>ID фирмы {queryData.brands[0].id}</p>
                    <p>Название фирмы {queryData.brands[0].name}</p>
                    <p>Название марки:  {queryData.brands[0].brand}  Количество: {queryData.brands[0].count}</p>
                    <p>Название марки:  {queryData.brands[1].brand}  Количество: {queryData.brands[1].count}</p>
                    <p>Название марки:  {queryData.brands[2].brand}  Количество: {queryData.brands[2].count}</p>
                </div>
                <div>
                    <p>Самые некачественные марки по всем фирмам</p>
                    <p>Название марки:  {queryData.secondBrands[0].name}</p>
                    <p>Название марки:  {queryData.secondBrands[1].name}</p>
                    <p>Название марки:  {queryData.secondBrands[2].name}</p>
                </div>
            </div>}
        </div>
    )
}

export default FirstQuery
