import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./DeviceNames.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updateDeviceName, updateDeviceNameDialogClose} from "../../../redux/actions/deviceNames";
import {useDispatch, useSelector} from "react-redux";

const UpdateDeviceName = (props) => {
    console.log('current', props.currentValue)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [deviceNameName, setDeviceNameName] = useState('')
    const [deviceNameId, setDeviceNameId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.deviceNames.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        console.log('props', props)
        setDeviceNameId(props.currentValue.id)
        setDeviceNameName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdateDeviceName = (id, name) => {
        console.log(id, name)
        dispatch(updateDeviceName(id, name))
    }
    const handleDeviceNameNameChange = (e) => {
        const deviceName = e.target.value
        setDeviceNameName(deviceName)
        handleUpdateValidate(deviceName)
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
        dispatch(updateDeviceNameDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={deviceNameName} onChange={handleDeviceNameNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleUpdateDeviceName(deviceNameId, deviceNameName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateDeviceName
