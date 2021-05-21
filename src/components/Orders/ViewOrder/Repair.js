import React from 'react'
import styles from './ViewOrder.module.css'

const Repair = (props) => {
    return (
        <div className={styles.repair}>
            <p>Цена: {props.info.price}р</p>
            {props.info.completion && <p>Состояние: Выполнено</p>}
            {!props.info.completion && <p>Состояние: Не выполнено</p>}
            <p>Вид работы: {props.info.type}</p>
        </div>
    )
}

export default Repair
