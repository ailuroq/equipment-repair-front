import React, {useEffect} from 'react'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../redux/actions/orders";
import styles from './ViewOrder.module.css'

const ViewOrder = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const orderInfo = useSelector(state => state.orders.orderData)

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
                        <ul>
                            <li>{orderInfo.order.receipt_number}</li>
                            <li>{orderInfo.order.order_date}</li>
                            <li>{orderInfo.order.completion_date}</li>
                            <li>{orderInfo.order.order_completed}</li>
                        </ul>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ViewOrder
