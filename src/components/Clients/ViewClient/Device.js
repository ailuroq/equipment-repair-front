import React from 'react';
import styles from './ViewClient.module.css'

const Device = (props) => {
    return (
        <div className={styles.device}>
            {console.log(props)}
            <img src={'http://localhost:8000/' + props.photo}/>
            <p>ID: {props.id}</p>
            <p>Бренд: {props.brand}</p>
            <p>Страна: {props.country}</p>
            <p>Название: {props.name}</p>
            <p>Модель: {props.model}</p>
        </div>
    )
}

export default Device