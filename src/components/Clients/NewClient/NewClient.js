import React, {useState} from 'react'
import styles from "./NewClient.module.css";
import {Button, IconButton, TextField} from "@material-ui/core";
import NewDevice from "./NewDevice";
import SaveIcon from "@material-ui/icons/Save";
import {insertClient} from "../../../redux/actions/clients";
import {useDispatch} from "react-redux";
import {isNumber} from "@material-ui/data-grid";
import {Add} from "@material-ui/icons";
import NewDevices from "./NewDevices";

const NewClient = () => {
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [phone, setPhone] = useState('')
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
        notEmptyFieldsValidation(lastname, firstname, middlename, phone)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
        notEmptyFieldsValidation(lastname, firstname, middlename, phone)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
        notEmptyFieldsValidation(lastname, firstname, middlename, phone)
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value
        setPhone(phone)
        notEmptyFieldsValidation(lastname, firstname, middlename, phone)
    }
    const notEmptyFieldsValidation = (lastname, firstname, middlename, phone) => {
        if (lastname.length && firstname.length && middlename.length && phone.length) {
            setDisable(false)
        }
        else setDisable(true)
    }
    const handleInsertClient = () => {
        dispatch(insertClient(lastname, middlename, firstname, phone))
    }

    return (
        <div className={styles.new_client}>
            <div>
                <h2>Добавить клиента</h2>
            </div>
            <div>
                <form noValidate autoComplete="off">
                    <div className={styles.forms}>
                        <div>
                            <TextField
                                className={styles.text_field_item}
                                helperText={lastname === "" ? 'Обязательное поле' : ' '}
                                id="lastname"
                                label="Фамилия"
                                value={lastname}
                                onChange={handleLastnameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                className={styles.text_field_item}
                                id="firstname"
                                label="Имя"
                                value={firstname}
                                helperText={firstname === "" ? 'Обязательное поле' : ' '}
                                onChange={handleFirstnameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                className={styles.text_field_item}
                                id="middlename"
                                label="Отчество"
                                value={middlename}
                                helperText={middlename === "" ? 'Обязательное поле' : ' '}
                                onChange={handleMiddlenameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                className={styles.text_field_item}
                                id="phone"
                                label="Телефон"
                                value={phone}
                                helperText={phone === "" ? 'Обязательное поле' : ' '}
                                onChange={handlePhoneChange}
                            />
                        </div>
                    </div>
                </form>
                <div className={styles.insert_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={handleInsertClient}
                        disabled={disable}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
            <NewDevices/>

        </div>
    )
}

export default NewClient