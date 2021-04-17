import React from 'react';
import Device from "./Device";
import styles from './ViewClient.module.css'

const ClientDevices = (props) => {
    const devices = Array.from(props.devices)
    console.log(devices)
    return (
        <div className={styles.client_devices}>
            {
                devices.map(device => {
                    return (
                        <div key={device.id}>
                            <Device {...device}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ClientDevices