import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styles from './NewDevice.module.css'
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {getInsertDeviceInfo} from "../../../redux/actions/devices";


const NewDevice = () => {
    const [name, setName] = useState('')
    const [client, setClient] = useState()
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [photo, setPhoto] = useState()
    const [country, setCountry] = useState()

    const dispatch = useDispatch()
    const info = useSelector(state => state.devices.insertInfo)
    console.log(info)
    useEffect(() => {
        dispatch(getInsertDeviceInfo())
    }, [dispatch])

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
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    if (value) setName(value.id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите должность"
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
                </form>
            </div>
        </div>
    )
}

export default NewDevice
