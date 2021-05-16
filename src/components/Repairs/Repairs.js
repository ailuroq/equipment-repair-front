import React, {useEffect, useState} from 'react';
import styles from './Repairs.module.css';
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import {getClients} from "../../redux/actions/clients";
import {getRepairs} from "../../redux/actions/repairs";
import RepairFind from "./RepairFind";

const Repairs = () => {
    const [repairId, setRepairId] = useState()
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'receipt_number', headerName: 'Номер заказа', width: 160, sortable: false},
        {field: 'type', headerName: 'Вид работы', width: 260, sortable: false},
        {field: 'price', headerName: 'Стоимость', width: 150, sortable: false},
        {
            field: 'completion',
            headerName: 'Состояние',
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <p>{params.getValue('completion') && <div>Выполнен</div>}</p>
                    <p>{!params.getValue('completion') && <div>Не выполнен</div>}</p>
                </div>
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
                            <a href={'repairs/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'repairs/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            /*setUserId(params.getValue("id"))
                                            handleGetPotentialDataToDelete(params.getValue("id"))
                                            handleOpenDialog()*/
                                        }}
                                        cursor={'pointer'}
                            />
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const dispatch = useDispatch()
    const {repairs} = useSelector(state => state.repairs.repairData)
    console.log(repairs)
    useEffect(() => {
        dispatch(getRepairs())
    }, [dispatch])

    return (
        <div className={styles.repairs}>
            <RepairFind/>
            <div className={styles.table}>
                {repairs &&
                <DataGrid
                    rows={repairs}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50, 250, 500]}
                    checkboxSelection
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />}
            </div>
        </div>
    )
}

export default Repairs
