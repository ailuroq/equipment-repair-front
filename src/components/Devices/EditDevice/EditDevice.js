import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getDeviceUpdateData, updateDevice, updateDevicePhoto} from "../../../redux/actions/devices";
import {Button, TextField} from "@material-ui/core";
import styles from './EditDevice.module.css'
import {Autocomplete} from "@material-ui/lab";

const EditDevice = () => {
    const {id} = useParams()
    const [brand, setBrand] = useState()
    const [image, setImage] = useState()
    const [model, setModel] = useState('')
    const [country, setCountry] = useState()
    const [name, setName] = useState()
    const [client, setClient] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const deviceData = useSelector(state => state.devices.deviceInfo)
    console.log(deviceData)
    useEffect(() => {
        dispatch(getDeviceUpdateData(id))
    }, [dispatch, id])

    useEffect(() => {
        if (deviceData.defaultData) {
            setModel(deviceData.defaultData.model)
            setBrand(deviceData.defaultData.brandid)
            setCountry(deviceData.defaultData.countryid)
            setName(deviceData.defaultData.nameid)
            setClient(deviceData.defaultData.clientid)

        }
    }, [deviceData])
    const handlePhotoChange = (e) => {
        const data = e.target.files[0]
        console.log(data)
        setImage(data)
        fieldValidation(name, country, data, client, brand, model)
    }

    const handleModelChange = (e) => {
        const model = e.target.value
        setModel(model)
        fieldValidation(name, country, image, client, brand, model)
    }

    const handleCountryChange = (e) => {
        const country = e.target.value
        setCountry(country)
        fieldValidation(name, country, image, client, brand, model)
    }

    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name)
        fieldValidation(name, country, image, client, brand, model)
    }

    const handleBrandChange = (e) => {
        const brand = e.target.value
        setBrand(brand)
        fieldValidation(name, country, image, client, brand, model)
    }

    const handleClientChange = (e) => {
        const client = e.target.value
        setClient(client)
        fieldValidation(name, country, image, client, brand, model)
    }

    const handleSubmit = () => {
        dispatch(updateDevicePhoto(id, image))
        dispatch(updateDevice(id, name, country, client, brand, model))
    }

    const fieldValidation = (name, country, image, client, brand, model) => {
        if (name === deviceData.defaultData.name
            && country === deviceData.defaultData.country
            && client === deviceData.defaultData.client
            && brand === deviceData.defaultData.brand
            && model === deviceData.defaultData.model
        ) setDisable(true)
        else setDisable(false)
    }
    return (
        <div>
            <h2>Редактировать технику</h2>
            {deviceData.defaultData &&
            <div className={styles.forms}>
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
                <div>
                    <Autocomplete
                        id="brands"
                        className={styles.combo_box}
                        options={deviceData.brands}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) setBrand(value.id)
                            fieldValidation(name, country, image, client, value.id, model)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={deviceData.defaultData?.brandid + ' ' + deviceData.defaultData?.brand}
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
                        id="clients"
                        className={styles.combo_box}
                        options={deviceData.clients}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.lastname}
                        onChange={(e, value) => {
                            if (value) {
                                setClient(value.id)
                                fieldValidation(name, country, image, value.id, brand, model)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={deviceData.defaultData?.clientid + ' ' + deviceData.defaultData?.lastname}
                                variant="outlined"
                                helperText='Клиент'
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
                        id="country"
                        className={styles.combo_box}
                        options={deviceData.countries}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setCountry(value.id)
                                fieldValidation(name, value.id, image, client, brand, model)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={deviceData.defaultData?.countryid + ' ' + deviceData.defaultData?.country}
                                helperText='Страна'
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
                        options={deviceData.names}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setName(value.id)
                                fieldValidation(value.id, country, image, client, brand, model)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={deviceData.defaultData?.nameid + ' ' + deviceData.defaultData?.name}
                                variant="outlined"
                                helperText={'Название'}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>
            </div>

            }
            <div>
                <input type="file" name="file" onChange={handlePhotoChange}/>
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

export default EditDevice
