import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getInsertFirmData, insertFirm} from "../../../redux/actions/firms";
import {Button, TextField} from "@material-ui/core";
import styles from "../../Masters/NewMaster/NewMaster.module.css";
import SaveIcon from "@material-ui/icons/Save";
import {Autocomplete} from "@material-ui/lab";

const NewFirm = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const cities = useSelector(state => state.firms.insertInfo.cities)

    useEffect(() => {
        dispatch(getInsertFirmData())
    }, [dispatch])

    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name)
        notEmptyFieldsValidation(name, address, phone, city)
    }
    const handleAddressChange = (e) => {
        const address = e.target.value
        setAddress(address)
        notEmptyFieldsValidation(name, address, phone, city)
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value
        setPhone(phone)
        notEmptyFieldsValidation(name, address, phone, city)
    }
    const notEmptyFieldsValidation = (name, address, phone, city) => {
        if (name.length && address.length && phone.length && city) {
            setDisable(false)
        }
        else setDisable(true)
    }
    const handleSubmit = () => {
        dispatch(insertFirm(name, address, phone, city))
    }
    return (
        <div>
            <h2>Добавить фирму</h2>
            <div>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            className={styles.text_field_item}
                            helperText={name === "" ? 'Обязательное поле' : ' '}
                            id="name"
                            label="Имя"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            className={styles.text_field_item}
                            helperText={address === "" ? 'Обязательное поле' : ' '}
                            id="address"
                            label="Адрес"
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            className={styles.text_field_item}
                            helperText={phone === "" ? 'Обязательное поле' : ' '}
                            id="phone"
                            label="Телефон"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            id="posts"
                            className={styles.combo_box}
                            options={cities}
                            autoHighlight
                            style={{ width: 200 }}
                            disableClearable
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                                if (value) setCity(value.id-1)
                                notEmptyFieldsValidation(name, address, phone, value.id-1)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Выберите город"
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

export default NewFirm
