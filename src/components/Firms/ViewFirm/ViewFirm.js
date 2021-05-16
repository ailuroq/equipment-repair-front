import React, {useEffect} from 'react'
import styles from './ViewFirm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getFirmForView} from "../../../redux/actions/firms";

const ViewFirm = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const firm = useSelector(state => state.firms.firmData[0])
    console.log(firm)
    useEffect(() => {
        dispatch(getFirmForView(id))
    }, [dispatch, id])
    return (
        <div className={styles.view_firm}>
            {firm &&
            <div>
                <h2>Информация о фирме</h2>
                <p>Название: {firm.name}</p>
                <p>Адрес: {firm.address}</p>
                <p>Телефон: {firm.phone}</p>
                <p>Город: {firm.city}</p>
            </div>
            }
        </div>
    )
}

export default ViewFirm
