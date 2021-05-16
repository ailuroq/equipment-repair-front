import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styles from './NewDevice.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {getInsertDeviceInfo, insertDevice, updateDevice, updateDevicePhoto} from "../../../redux/actions/devices";


const NewDevice = () => {
    const [name, setName] = useState('')
    const [client, setClient] = useState()
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [photo, setPhoto] = useState()
    const [country, setCountry] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const info = useSelector(state => state.devices.insertInfo)
    console.log(info)
    useEffect(() => {
        dispatch(getInsertDeviceInfo())
    }, [dispatch])

    const handlePhotoChange = (e) => {
        const data = e.target.files[0]
        console.log(data)
        setPhoto(data)
        fieldValidation(name, country, data, client, brand, model)
    }

    const handleModelChange = (e) => {
        const model = e.target.value
        setModel(model)
        fieldValidation(name, country, photo, client, brand, model)
    }

    const handleSubmit = () => {
        console.log('here', photo)
        dispatch(insertDevice(name, client, photo, country,  brand, model))
    }

    const fieldValidation = (name, country, photo, client, brand, model) => {
        if (name && country && photo && client && brand && model) setDisable(false)
        else setDisable(true)
    }

    return (
        <div className={styles.new_device}>
            <div>
                <h2>Добавить технику</h2>
            </div>
            <div>
                <form noValidate autoComplete='off'>
                    <div className={styles.forms}>
                        <div>
                            <Autocomplete
                                id="name"
                                className={styles.combo_box}
                                options={info.names}
                                autoHighlight
                                style={{ width: 200 }}
                                disableClearable
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    if (value) setName(value.id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите название"
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
                                options={info.countries}
                                autoHighlight
                                disableClearable
                                style={{ width: 200 }}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    if (value) setCountry(value.id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите страну"
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
                                options={info.clients}
                                autoHighlight
                                disableClearable
                                style={{ width: 200 }}
                                getOptionLabel={(option) => option.id + ' ' +option.lastname}
                                onChange={(e, value) => {
                                    if (value) setClient(value.id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите клиента"
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
                                options={info.brands}
                                autoHighlight
                                style={{ width: 200 }}
                                disableClearable
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    if (value) setBrand(value.id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите марку"
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
                                id="model"
                                label="Модель"
                                value={model}
                                helperText={model === "" ? 'Обязательное поле' : ' '}
                                onChange={handleModelChange}
                            />
                        </div>
                    </div>
                    <div className={styles.stuff}>
                        <div>
                            <input type="file" name="file" onChange={handlePhotoChange}/>
                        </div>
                        <div>
                            <Button
                                onClick={handleSubmit}
                                color="primary"
                                variant="contained"
                                disabled={disable}
                            >Отправить</Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewDevice
