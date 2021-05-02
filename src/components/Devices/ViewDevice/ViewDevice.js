import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import styles from './ViewDevice.module.css';
import {getDevice} from "../../../redux/actions/devices";

const ViewDevice = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const deviceInfo = useSelector(state => state.devices.deviceInfo.device)
    console.log(deviceInfo)
    useEffect(() => {
        dispatch(getDevice(id))
    }, [dispatch, id])

    return (
        <div className={styles.view_device}>
            { deviceInfo &&
            <div>
                <h2>Информация о технике</h2>
                <img src={'http://localhost:8000/' + deviceInfo[0].photo} alt=""/>
                <ul className={styles.device_info}>
                    <li>Марка: {deviceInfo[0].brands}</li>
                    <li>Страна: {deviceInfo[0].country}</li>
                    <li>Модель: {deviceInfo[0].model}</li>
                    <li>Название: {deviceInfo[0].name}</li>
                </ul>
                <h3>Владелец техники (Клиент)</h3>
                <ul className={styles.client_info}>
                    <li>Фамилия: {deviceInfo[0].lastname}</li>
                    <li>Имя: {deviceInfo[0].firstname}</li>
                    <li>Отчество: {deviceInfo[0].middlename}</li>
                    <li>Телефон: {deviceInfo[0].phone}</li>
                </ul>
            </div>
            }
        </div>
    )
}

export default ViewDevice
