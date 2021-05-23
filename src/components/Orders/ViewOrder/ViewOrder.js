import React, {useEffect} from 'react'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../redux/actions/orders";
import styles from './ViewOrder.module.css'
import moment from 'moment'
import Repair from "./Repair";

const ViewOrder = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const orderInfo = useSelector(state => state.orders.orderData)
    console.log(orderInfo)
    useEffect(() => {
        dispatch(getOrder(id))
    }, [dispatch, id])

    return (
        <div className={styles.view_order}>
            {orderInfo &&
            <div>
                <div>
                    <h2>Информация о заказе</h2>
                    <div>
                        {orderInfo.order &&
                        <div>
                            <p>id заказа: {orderInfo.order.id}</p>
                            <p>номер заказа: {orderInfo.order.receipt_number}</p>
                            {orderInfo.order.order_date && <p>дата заказа: {moment(orderInfo.order.order_date).format('DD-MM-YYYY')}</p>}
                            {orderInfo.order.completion_date && <p>Дата выполнения: {moment(orderInfo.order.completion_date).format('DD-MM-YYYY')}</p>}
                            {!orderInfo.order.completion_date && <p>Не выполнен</p>}
                            <p>Фамилия мастера ответственного за заказ: {orderInfo.order.lastname}</p>
                            <p>Информация о технике заказа</p>
                            <p>Название: {orderInfo.order.name}</p>
                            <p><img src={'http://localhost:8000/' + orderInfo.order.photo} alt=""/></p>
                        </div>}
                        <h3>Работы данного заказа</h3>
                        {orderInfo.repairs &&
                        <div className={styles.repairs}>
                            {orderInfo.repairs.map(repair => {
                                return (
                                    <Repair info={repair} />
                                )
                            })}
                        </div>}
                        {orderInfo && <p>Итоговая цена за весь заказ: <b>{orderInfo?.price?.sum}</b></p>}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ViewOrder
