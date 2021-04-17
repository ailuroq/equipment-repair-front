import React, {useEffect, useState} from 'react';
import styles from './EditClient.module.css'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getClient} from "../../../redux/actions/clients";
import ClientDevices from "../ViewClient/ClientDevices";
import {Button, TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {load} from "dotenv";

const EditClient = () => {
    const {id} = useParams()
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)
    const [disable, setDisable] = useState(true)
    
    const dispatch = useDispatch()
    let client = useSelector((state) => state.clients.clientViewInfo.client[0])
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
        console.log(phone)
    }
    
    
    return (
        <div className={styles.edit_client}>
            {client &&
            <div>
                <h2>Информация о клиенте</h2>
                <form noValidate autoComplete="off">
                    <div className={styles.forms}>
                        <TextField id="lastname" label="Фамилия" value={lastname} onChange={handleLastnameChange} />
                        <TextField id="firstname" label="Имя" value={firstname} onChange={handleFirstnameChange} />
                        <TextField id="middlename" label="Отчество" value={middlename} onChange={handleMiddlenameChange} />
                        <TextField id="phone" label="Телефон" value={phone} onChange={handlePhoneChange} />
                    </div>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    disabled={disable}
                    className={styles.save_button}
                >
                    Save
                </Button>

            </div>
            }
            {clientDevices &&
            <div>
                <h2>Техника пользователя</h2>
                {clientDevices && <ClientDevices devices={clientDevices}/>}
            </div>
            }
        </div>
    )
}

export default EditClient