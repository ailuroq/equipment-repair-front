import React, {useEffect, useState} from 'react';
import styles from './EditClient.module.css'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getClient, updateClient} from "../../../redux/actions/clients";
import ClientDevices from "../ViewClient/ClientDevices";
import {Button, TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

const EditClient = () => {
    const {id} = useParams()
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const client = useSelector((state) => state.clients.clientViewInfo.client[0])
    const clientDevices = useSelector((state) => state.clients.clientViewInfo.clientDevices)

    useEffect(() => {
        dispatch(getClient(id))
    }, [dispatch, id])

    if (client && loading) {
        setLastname(client.lastname)
        setFirstname(client.firstname)
        setMiddlename(client.middlename)
        setPhone(client.phone)
        setLoading(false)
    }
    const checkDefaultValues = (lastname, firstname, middlename, phone) => {
        if (lastname === client.lastname && firstname === client.firstname && middlename === client.middlename && phone === client.phone){
            setDisable(true)
        }
        else setDisable(false)
    }

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
        checkDefaultValues(lastname, firstname, middlename, phone)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
        checkDefaultValues(lastname, firstname, middlename, phone)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
        checkDefaultValues(lastname, firstname, middlename, phone)
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value
        setPhone(phone)
        checkDefaultValues(lastname, firstname, middlename, phone)
    }

    const handleSubmit = () => {
        dispatch(updateClient(id, lastname, firstname, middlename, phone));
    }

    return (
        <div className={styles.edit_client}>
            {client &&
            <div>
                <h2>Информация о клиенте</h2>
                <form noValidate autoComplete="off">
                    <div className={styles.forms}>
                        <TextField className={styles.text_field_item} id="lastname" label="Фамилия" value={lastname} onChange={handleLastnameChange} />
                        <TextField className={styles.text_field_item} id="firstname" label="Имя" value={firstname} onChange={handleFirstnameChange} />
                        <TextField className={styles.text_field_item} id="middlename" label="Отчество" value={middlename} onChange={handleMiddlenameChange} />
                        <TextField className={styles.text_field_item} id="phone" label="Телефон" value={phone} onChange={handlePhoneChange} />
                    </div>
                </form>
                <div className={styles.save_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        disabled={disable}
                        onClick={handleSubmit}
                    >
                        Обновить
                    </Button>
                </div>

            </div>
            }
            {clientDevices &&
            <div>
                <h2>Техника клиента</h2>
                {clientDevices && <ClientDevices devices={clientDevices}/>}
            </div>
            }
        </div>
    )
}

export default EditClient
