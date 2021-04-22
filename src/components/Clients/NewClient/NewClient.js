import React, {useState} from 'react'
import styles from "./NewClient.module.css";
import {TextField} from "@material-ui/core";

const NewClient = () => {
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [phone, setPhone] = useState('')

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value
        setPhone(phone)
    }
    return (
        <div>
            <div>
                <h2>Добавить клиента</h2>
            </div>
            <div>
                <form noValidate autoComplete="off">
                    <div className={styles.forms}>
                        <TextField className={styles.text_field_item} id="lastname" label="Фамилия" value={lastname} onChange={handleLastnameChange} />
                        <TextField className={styles.text_field_item} id="firstname" label="Имя" value={firstname} onChange={handleFirstnameChange} />
                        <TextField className={styles.text_field_item} id="middlename" label="Отчество" value={middlename} onChange={handleMiddlenameChange} />
                        <TextField className={styles.text_field_item} id="phone" label="Телефон" value={phone} onChange={handlePhoneChange} />
                    </div>
                </form>
            </div>
            <div>
                <h2>Добавить технику</h2>

            </div>
        </div>
    )
}

export default NewClient