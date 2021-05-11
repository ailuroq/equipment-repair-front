import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Countries.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updateCountry, updateCountryDialogClose} from "../../../redux/actions/countries";
import {useDispatch, useSelector} from "react-redux";

const UpdateCountry = (props) => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [CountryName, setCountryName] = useState('')
    const [CountryId, setCountryId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.countries.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        setCountryId(props.currentValue.id)
        setCountryName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdateCountry = (id, name) => {
        console.log(id, name)
        dispatch(updateCountry(id, name))
    }
    const handleCountryNameChange = (e) => {
        const Country = e.target.value
        setCountryName(Country)
        handleUpdateValidate(Country)
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
        dispatch(updateCountryDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={CountryName} onChange={handleCountryNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleUpdateCountry(CountryId, CountryName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateCountry
