import React, {useEffect} from 'react'
import {useParams} from "react-router";
import {getMaster} from "../../../redux/actions/masters";
import {useDispatch, useSelector} from "react-redux";
import styles from './ViewMaster.module.css'

const ViewMaster = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const master = useSelector(state => state.masters.masterViewInfo.master)
    console.log(master)
    useEffect(() => {
        dispatch(getMaster(id))
    }, [dispatch, id])
    return (
        <div>
            {master &&
            <div className={styles.view_master}>
                <h2>Информация о мастере</h2>
                <p>Фамилия: {master.lastname}</p>
                <p>Имя: {master.firstname}</p>
                <p>Отчество: {master.middlename}</p>
                <p>Опыт работы: {master.experience}</p>
                <p>Фирма: {master.firm}</p>
                <p>Должность: {master.post}</p>
            </div>}
        </div>
    )
}

export default ViewMaster
