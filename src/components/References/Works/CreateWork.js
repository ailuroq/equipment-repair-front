import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Works.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {createWorkDialogClose, getAllWorks, insertWork} from "../../../redux/actions/works";

const CreateWork = () => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [workName, setWorkName] = useState('')
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.works.createDialog)
    console.log()
    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    const handleCreateWork = (name) => {
        dispatch(insertWork(name))
    }
    const handleWorkNameChange = (e) => {
        const work = e.target.value
        setWorkName(work)
        handleUpdateValidate(work)
    }
    const handleUpdateValidate = (name) => {
        console.log(name.length)
        if (!name.length) {
            console.log('true')
            setDisable(true)
        } else setDisable(false)
    }
    const handleCloseUpdateDialog = () => {
        dispatch(createWorkDialogClose())
        setUpdateDialogOpen(false)
    }
    return (
        <div>
            <Dialog
                open={updateDialogOpen}
                onClose={handleCloseUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Добавление марки"}</DialogTitle>
                <DialogContent>
                    <TextField className={styles.text_field_item} id="name" label="Название" value={workName} onChange={handleWorkNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        disabled={disable}
                        autoFocus
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleCreateWork(workName)
                            dispatch(getAllWorks())
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateWork
