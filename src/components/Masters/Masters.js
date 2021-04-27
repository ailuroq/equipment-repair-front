import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from "@material-ui/core";
import {caseOfNum} from "../common/convertCase";
import styles from './Masters.module.css'
import MastersFind from "./MastersFind";
import {deleteMaster, getMasters, getPotentialDataToDelete} from "../../redux/actions/masters";

const Masters = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [masterId, setMasterId] = useState()
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'lastname', headerName: 'Фамилия', width: 160, sortable: false},
        {field: 'firstname', headerName: 'Имя', width: 160, sortable: false},
        {field: 'middlename', headerName: 'Отчество', width: 160, sortable: false},
        {field: 'experience', headerName: 'Опыт(лет)', width: 120, sortable: false},
        {field: 'post', headerName: 'Опыт работы', width: 140, sortable: false},
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
                            <a href={'masters/edit/' + params.getValue("id")}>
                                <EditTwoToneIcon style={{color: 'green'}}/>
                            </a>
                        </li>
                        <li>
                            <a href={'masters/view/' + params.getValue("id")}>
                                <VisibilityTwoToneIcon style={{color: '#3e78b6'}}/>
                            </a>
                        </li>
                        <li>
                            <DeleteIcon style={{color: '#4f4f4f'}}
                                        onClick={(e) => {
                                            setMasterId(params.getValue("id"))
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
    const {masters} = useSelector((state) => state.masters.masterData)
    console.log(masters)
    const handleDeleteMasterById = (id) => {
        dispatch(deleteMaster(id))
    }

    useEffect(() => {
        dispatch(getMasters())
    }, [dispatch])

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    return (
        <div className={styles.masters}>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Не удалять
                    </Button>
                    <Button onClick={()=>{
                        handleCloseDialog()
                        handleDeleteMasterById(masterId)
                    }} color="primary" autoFocus>
                        Все равно удалить
                    </Button>
                </DialogActions>
            </Dialog>
            <MastersFind/>
            <div className={styles.table}>
                {masters &&
                <DataGrid
                    rows={masters}
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

export default Masters
