import React, {useEffect, useState} from 'react'
import styles from './Firms.module.css'
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {getFirms, getPotentialDataToDelete} from "../../redux/actions/firms";
import {DataGrid} from "@material-ui/data-grid";

const Firms = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [firmId, setFirmId] = useState()
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 160, sortable: false},
        {field: 'address', headerName: 'Адрес', width: 160, sortable: false},
        {field: 'phone', headerName: 'Телефон', width: 140, sortable: false},
        {field: 'city', headerName: 'Город', width: 160, sortable: false},
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
                            <a href={'firms/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'firms/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setFirmId(params.getValue("id"))
                                            handleGetPotentialDataToDelete(params.getValue("id"))
                                            handleOpenDialog()
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
    const {firms} = useSelector((state) => state.firms.firmData)
    console.log(firms)


    useEffect(() => {
        dispatch(getFirms())
    }, [dispatch])

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }
    const handleGetPotentialDataToDelete = (firmId) => {
        dispatch(getPotentialDataToDelete(firmId))
    }

    return (
        <div className={styles.firms}>
            <div className={styles.table}>
                {firms &&
                <DataGrid
                    rows={firms}
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

export default Firms
