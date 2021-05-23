import React, {useEffect, useState} from 'react'
import styles from './NewRepair.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {getInsertRepairData, insertRepair} from "../../../redux/actions/repairs";
import SaveIcon from "@material-ui/icons/Save";

const NewRepair = () => {
    const [orderId, setOrderId] = useState()
    const [workId, setWorkId] = useState()
    const [price, setPrice] = useState()
    const [completion, setCompletion] = useState('')
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()

    const repairData = useSelector(state => state.repairs.repairData)
    console.log(repairData.orders)
    useEffect(() => {
        dispatch(getInsertRepairData())
    }, [dispatch])

    const handlePriceChange = (e) => {
        const price = e.target.value
        validateFields(orderId, workId, price, completion)
        setPrice(price)
    }
    const validateFields = (orderId, workId, price, completion) => {
        console.log(orderId, workId, price, completion)

        if (orderId && workId && price && completion) {
            setDisable(false)
        } else setDisable(true)
    }

    const handleSubmit = () => {
        if (completion === 'Готово') dispatch(insertRepair(orderId, workId, true, price))
        if (completion === 'Не готово') dispatch(insertRepair(orderId, workId, false, price))

    }
    return (
        <div className={styles.new}>
            <div>
                <Autocomplete
                    id="firms"
                    className={styles.combo_box}
                    options={repairData.works}
                    autoHighlight
                    disableClearable
                    style={{ width: 200 }}
                    getOptionLabel={(option) => option.id + ' ' + option.type}
                    onChange={(e, value) => {
                        if (value) {
                            setWorkId(value.id)
                            validateFields(orderId, value.id, price, completion)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText='Выбрать вид работы'
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
                    id="firms"
                    className={styles.combo_box}
                    options={repairData.orders}
                    autoHighlight
                    disableClearable
                    style={{ width: 200 }}
                    getOptionLabel={(option) => 'id заказа: ' + option.id + ' номер заказа: ' + option.receipt_number}
                    onChange={(e, value) => {
                        if (value) {
                            setOrderId(value.id)
                            validateFields(value.id, workId, price, completion)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText='Выбрать заказ'
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
                    id="firms"
                    className={styles.combo_box}
                    options={[
                        {ready: 'Готово'},
                        {ready: 'Не готово'}
                    ]}
                    autoHighlight
                    disableClearable
                    style={{ width: 200 }}
                    getOptionLabel={(option) => option.ready}
                    onChange={(e, value) => {
                        if (value) {
                            setCompletion(value.ready)
                            validateFields(orderId, workId, price, value.ready)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText='Выбрать состояние'
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
                <TextField
                    className={styles.text_field_item}
                    id="price"
                    label="Стоимость"
                    value={price}
                    type='number'
                    onChange={handlePriceChange}
                />
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
        </div>
    )
}

export default NewRepair
