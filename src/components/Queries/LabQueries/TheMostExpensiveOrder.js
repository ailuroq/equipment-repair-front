import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getTheMostExpensiveOrder} from "../../../redux/actions/queries";

const TheMostExpensiveOrder = () => {
    const dispatch = useDispatch()
    const {order} = useSelector(state => state.queries.orderData)
    console.log(order)
    useEffect(() => {
        dispatch(getTheMostExpensiveOrder())
    }, [dispatch])
    return (
        <div>
            {order &&
            <div>
                <p>Информация о самом дорогом заказе</p>
                <p>id: {order.id}</p>
                <p>Дата заказа: {order.order_date}</p>
                <p>Дата выполнения: {order.completion_date}</p>
                <p>Сумма: <b>{order.sum}</b></p>
            </div>}
        </div>
    )
}

export default TheMostExpensiveOrder
