import React, {useEffect, useState} from 'react'
import styles from './EditFirm.module.css'
import {useParams} from "react-router";
import {getUpdateFirmData, updateFirm} from "../../../redux/actions/firms";
import {useDispatch, useSelector} from "react-redux";
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";

const EditFirm = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const updateData = useSelector(state => state.firms.updateFirmData)
    console.log(updateData)

    useEffect(() => {
        dispatch(getUpdateFirmData(id))
    }, [dispatch, id])

    useEffect(() => {
        if (updateData.current) {
            setName(updateData.current.name)
            setAddress(updateData.current.address)
            setPhone(updateData.current.phone)
            setCity(updateData.current.city_id)
        }
    }, [updateData])
    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name)
        checkDefaultValues(name, address, phone, city)
    }
    const handleAddressChange = (e) => {
        const address = e.target.value
        setAddress(address)
        checkDefaultValues(name, address, phone, city)
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value
        setPhone(phone)
        checkDefaultValues(name, address, phone, city)
    }
    const handleSubmit = () => {
        dispatch(updateFirm(id, name, address, phone, city))
    }
    const checkDefaultValues = (name, address, phone, city) => {
        if (name === updateData.current.name && address === updateData.current.address && phone === updateData.current.phone && city === updateData.current.city_id) {
            setDisable(true)
        } else setDisable(false)
    }

    return (
        <div>
            {updateData.current &&
            <div>
                <h2>Информация о фирме</h2>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField className={styles.text_field_item} id="name" label="Название" value={name} onChange={handleNameChange} />
                        <TextField className={styles.text_field_item} id="address" label="Адрес" value={address} onChange={handleAddressChange} />
                        <TextField className={styles.text_field_item} id="phone" label="Телефон" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div>
                        <Autocomplete
                            id="brands"
                            className={styles.combo_box}
                            options={updateData.cities}
                            autoHighlight
                            disableClearable
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id-1 + ' ' + option.name}
                            onChange={(e, value) => {
                                if (value) {
                                    setCity(value.id-1)
                                    checkDefaultValues(name, address, phone, value.id-1)
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={updateData.current?.city_id + ' ' + updateData.cities[updateData.current?.city_id].name}
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
                </form>
                <div className={styles.save_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={disable}
                        onClick={handleSubmit}
                    >
                        Обновить
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default EditFirm
