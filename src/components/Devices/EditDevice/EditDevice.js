import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getDeviceUpdateData, updateDevice} from "../../../redux/actions/devices";
import {Button, TextField, Typography} from "@material-ui/core";
import styles from "../../Masters/NewMaster/NewMaster.module.css";
import {Autocomplete} from "@material-ui/lab";

const EditDevice = () => {
    const {id} = useParams()
    const [brand, setBrand] = useState()
    const [image, setImage] = useState()
    const [model, setModel] = useState('')
    const [country, setCountry] = useState()
    const [name, setName] = useState()
    const [client, setClient] = useState()

    const dispatch = useDispatch()
    const deviceData = useSelector(state => state.devices.deviceInfo)
    console.log(deviceData)
    useEffect(() => {
        dispatch(getDeviceUpdateData(id))
    }, [dispatch, id])

    const handlePhotoChange = (e) => {
        setImage(e.target.files)
        console.log(image)
    }

    const handleModelChange = (e) => {
        const model = e.target.value
        setModel(model)
    }

    const handleSubmit = () => {
        dispatch(updateDevice(id, name, country, image, client, brand, model))
    }
    return (
        <div>
            {deviceData &&
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
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}

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
                    <Autocomplete
                        id="clients"
                        className={styles.combo_box}
                        options={deviceData.clients}
                        autoHighlight
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.lastname}
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

            </div>

            }
            <div>
                <input type="file" onChange={handlePhotoChange}/>
                <Button
                    onClick={handleSubmit}
                >Отправить</Button>
            </div>
        </div>
    )
}

export default EditDevice
