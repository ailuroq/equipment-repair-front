import React, {useEffect, useState} from 'react'
import styles from './EditRepair.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {getInsertRepairData, getRepairUpdateInfo, insertRepair, updateRepair} from "../../../redux/actions/repairs";
import SaveIcon from "@material-ui/icons/Save";
import {useParams} from "react-router";
import createPalette from "@material-ui/core/styles/createPalette";

const EditRepair = () => {
    const {id} = useParams()
    const [orderId, setOrderId] = useState()
    const [workId, setWorkId] = useState()
    const [price, setPrice] = useState()
    const [completion, setCompletion] = useState('')
    const [defaultReady, setDefaultReady] = useState('')
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()

    const repairData = useSelector(state => state.repairs.updateData)
    console.log(repairData)
    useEffect(() => {
        dispatch(getRepairUpdateInfo(id))
    }, [dispatch, id])

    useEffect(() => {
        if (repairData) {
            if (repairData.current?.completion === true) setDefaultReady('Готово')
            if (repairData.current?.completion === false) setDefaultReady('Не готово')
            setPrice(repairData.current?.price)
            setOrderId(repairData.current?.order)
            setWorkId(repairData.current?.work)
            setCompletion(repairData.current?.completion)
        }
    }, [repairData])

    const handlePriceChange = (e) => {
        const price = e.target.value
        validateFields(orderId, workId, price, completion)
        setPrice(price)
    }
    const validateFields = (orderId, workId, price, completion) => {
        if (orderId && workId && price && completion) {
            setDisable(false)
        } else setDisable(true)
    }

    const handleSubmit = () => {
        if (completion === 'Готово') dispatch(updateRepair(id,orderId, workId, true, price))
        if (completion === 'Не готово') dispatch(updateRepair(id, orderId, workId, false, price))

    }
    return (
        <div>
            {repairData.current &&
            <div className={styles.edit}>
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
                                helperText='Выбрать работу'
                                label={repairData.current?.work + ' ' + repairData.current?.type}
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
                        getOptionLabel={(option) => option.id + ' ' + option.receipt_number}
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
                                label={repairData.current?.order + ' ' + repairData.current.receipt_number}
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
                        defaultValue={() => {

                        }}
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
                                label={defaultReady}
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
            </div>}
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

export default EditRepair
