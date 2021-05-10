import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Brands.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updateBrand, updateBrandDialogClose} from "../../../redux/actions/brands";
import {useDispatch, useSelector} from "react-redux";

const UpdateBrand = (props) => {
    console.log('current', props.currentValue)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [brandName, setBrandName] = useState('')
    const [brandId, setBrandId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.brands.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        console.log('props', props)
        setBrandId(props.currentValue.id)
        setBrandName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdateBrand = (id, name) => {
        console.log(id, name)
        dispatch(updateBrand(id, name))
    }
    const handleBrandNameChange = (e) => {
        const brand = e.target.value
        setBrandName(brand)
        handleUpdateValidate(brand)
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
        dispatch(updateBrandDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={brandName} onChange={handleBrandNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                        handleCloseUpdateDialog()
                        handleUpdateBrand(brandId, brandName)
                    }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateBrand
