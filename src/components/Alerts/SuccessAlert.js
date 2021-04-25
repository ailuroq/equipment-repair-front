import React, {useState} from 'react'
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clearAlert} from "../../redux/actions/alerts";

const SuccessAlert = () => {
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    const successAlert = useSelector((state => state.alerts.successAlert))

    const handleOpen = () => {
        setOpen(true)
        dispatch(clearAlert())
    }
    const handleClose = () => {
        setOpen(false)
    }
    if (successAlert) {
        handleOpen()
    }
    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Действие выполнилось успешно!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SuccessAlert
