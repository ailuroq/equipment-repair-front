import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Works.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updateWork, updateWorkDialogClose} from "../../../redux/actions/works";
import {useDispatch, useSelector} from "react-redux";

const UpdateWork = (props) => {
    console.log('current', props.currentValue)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [workName, setWorkName] = useState('')
    const [workId, setWorkId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.works.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        console.log('props', props)
        setWorkId(props.currentValue.id)
        setWorkName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdateWork = (id, name) => {
        console.log(id, name)
        dispatch(updateWork(id, name))
    }
    const handleWorkNameChange = (e) => {
        const work = e.target.value
        setWorkName(work)
        handleUpdateValidate(work)
    }
    const handleUpdateValidate = (name) => {
        if (name.length === 0 || name === props.currentValue.name) {
            setDisable(true)
        } else setDisable(false)
    }
    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true)
    }
    const handleCloseUpdateDialog = () => {
        dispatch(updateWorkDialogClose())
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
                <DialogTitle id="alert-dialog-title">{"Возможные нежелательные удаления данных"}</DialogTitle>
                <DialogContent>
                    <TextField className={styles.text_field_item} id="name" label="Название" value={workName} onChange={handleWorkNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleUpdateWork(workId, workName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateWork
