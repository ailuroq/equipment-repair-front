import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Countries.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {createCountryDialogClose, getAllCountries, insertCountry} from "../../../redux/actions/countries";


const CreateCountry = () => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [countryName, setCountryName] = useState('')
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.countries.createDialog)
    console.log(updateDialog)
    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    const handleCreateCountry = (name) => {
        dispatch(insertCountry(name))
    }
    const handleCountryNameChange = (e) => {
        const country = e.target.value
        setCountryName(country)
        handleUpdateValidate(country)
    }
    const handleUpdateValidate = (name) => {
        console.log(name.length)
        if (!name.length) {
            console.log('true')
            setDisable(true)
        } else setDisable(false)
    }
    const handleCloseUpdateDialog = () => {
        dispatch(createCountryDialogClose())
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
                <DialogTitle id="alert-dialog-title">{"Добавление страны"}</DialogTitle>
                <DialogContent>
                    <TextField className={styles.text_field_item} id="name" label="Название" value={countryName} onChange={handleCountryNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        disabled={disable}
                        autoFocus
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleCreateCountry(countryName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateCountry
