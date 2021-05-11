import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Cities.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {createCityDialogClose, getAllCities, insertCity} from "../../../redux/actions/cities";

const CreateCity = () => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [cityName, setCityName] = useState('')
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.cities.createDialog)
    console.log()
    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    const handleCreateCity = (name) => {
        dispatch(insertCity(name))
    }
    const handleCityNameChange = (e) => {
        const city = e.target.value
        setCityName(city)
        handleUpdateValidate(city)
    }
    const handleUpdateValidate = (name) => {
        console.log(name.length)
        if (!name.length) {
            console.log('true')
            setDisable(true)
        } else setDisable(false)
    }
    const handleCloseUpdateDialog = () => {
        dispatch(createCityDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={cityName} onChange={handleCityNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        disabled={disable}
                        autoFocus
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleCreateCity(cityName)
                            dispatch(getAllCities())
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateCity
