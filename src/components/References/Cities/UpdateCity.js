import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Cities.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updateCity, updateCityDialogClose} from "../../../redux/actions/cities";
import {useDispatch, useSelector} from "react-redux";

const UpdateCity = (props) => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [cityName, setCityName] = useState('')
    const [cityId, setCityId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.cities.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        setCityId(props.currentValue.id)
        setCityName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdateCity = (id, name) => {
        console.log(id, name)
        dispatch(updateCity(id, name))
    }
    const handleCityNameChange = (e) => {
        const city = e.target.value
        setCityName(city)
        handleUpdateValidate(city)
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
        dispatch(updateCityDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={cityName} onChange={handleCityNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleUpdateCity(cityId, cityName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateCity
