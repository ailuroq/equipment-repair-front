import React, {useState} from 'react'
import styles from './NewClient.module.css'
import NewDevice from "./NewDevice";
import {Button, IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import Device from "../ViewClient/Device";
import {keys} from "@material-ui/core/styles/createBreakpoints";

const NewDevices = () => {
    const [deviceArray, setDeviceArray] = useState([])
    const [keys, setKeys] = useState()
    const handleAddDevice = () => {
        setDeviceArray(deviceArray => {
            return [...deviceArray, <NewDevice key={deviceArray.keys()}/>]
        })
    }
    const handleDeleteDevices = () => {
        setDeviceArray([])
    }
    return (
        <div className={styles.new_devices}>
            <h2>Добавить технику</h2>
            <Button onClick={handleDeleteDevices}>Очистить технику</Button>
            <div className={styles.new_devices_grid}>
                {deviceArray.map(component => {
                    return (
                        <div>
                            {component}
                            {console.log(component.state)}
                        </div>
                    )
                })}
                <div className={styles.add_button}>
                    <IconButton className={styles.icon_button} aria-label="add" onClick={handleAddDevice}>
                        <Add fontSize="large" />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default NewDevices