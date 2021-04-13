import React, {useEffect, useState} from 'react';
import styles from './Clients.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getClients} from "../../redux/actions/clients";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';


const Clients = () => {
    const [limit, setLimit] = useState(10000)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'lastname', headerName: 'Фамилия', width: 160, sortable: false},
        {field: 'firstname', headerName: 'Имя', width: 160, sortable: false},
        {field: 'middlename', headerName: 'Отчество', width: 160, sortable: false},
        {field: 'phone', headerName: 'Телефон', width: 140, sortable: false},
        {
            field: 'tech',
            headerName: 'Техника',
            sortable: false,
            width: 165,
            renderCell: (params) => (
                <a className={styles.tech} href={'clients/' + params.getValue("id")}>Просмотреть технику</a>
            )
        },
        {
            field: 'actions',
            headerName: 'Действия',
            sortable: false,
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <ul className={styles.buttons}>
                        <li>
                            <a href={'clients/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}} />
                            </a>
                        </li>
                        <li>
                            <a href={'clients/watch/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}} />
                            </a>
                        </li>
                        <li>
                            <a href={'clients/delete/' + params.getValue("id")}>
                                <DeleteIcon style={{color: '#4f4f4f'}} />
                            </a>
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {clients} = useSelector((state) => state.clients.clientData)
    console.log(clients)


    useEffect(() => {
        dispatch(getClients(limit))
    }, [dispatch, limit])

    return (
        <div className={styles.clients}>
            {/*<div className={styles.menu}>
                <button className={styles.buttons} style={{background:'red'}}>Добавить</button>
                <button className={styles.buttons}>Удалить</button>
                <button className={styles.buttons}>Редактировать</button>
                <button className={styles.buttons}>Просмотреть</button>
                <button className={styles.buttons}>Генерировать заново</button>
            </div>*/}
            <div className={styles.find}>

            </div>
            <div className={styles.table}>
                {clients &&
                <DataGrid
                    rows={clients}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25, 50, 100, 200]}
                    checkboxSelection autoHeight={true}
                    disableSelectionOnClick={true}
                />}
            </div>
        </div>

    )
}

export default Clients