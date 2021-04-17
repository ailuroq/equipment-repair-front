import React, {useEffect} from 'react';
import styles from '../Clients.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getClient} from "../../../redux/actions/clients";
import ClientDevices from "./ClientDevices";

const ViewClient = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    let client = useSelector((state) => state.clients.clientViewInfo.client[0])
    const clientDevices = useSelector((state) => state.clients.clientViewInfo.clientDevices)
    console.log(client)
    useEffect(() => {
        dispatch(getClient(id))
    }, [dispatch, id])
    return (
        <div className={styles.view_client}>
            {client &&
            <div>
                <h2>Информация о клиенте</h2>
                <div className={styles.client_info}>
                    <ul className={styles.client_info}>
                        <li>ID: {client.id}</li>
                        <li>Фамилия: {client.lastname}</li>
                        <li>Имя: {client.firstname}</li>
                        <li>Отчество: {client.middlename}</li>
                        <li>Телефон: {client.phone}</li>
                    </ul>
                </div>
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

export default ViewClient