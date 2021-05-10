import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Brands.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {getAllBrands, insertBrand, updateBrandDialogClose} from "../../../redux/actions/brands";
import {useDispatch, useSelector} from "react-redux";

const CreateBrand = () => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [brandName, setBrandName] = useState('')
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.brands.createDialog)
    console.log(updateDialog)
    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    const handleCreateBrand = (name) => {
        dispatch(insertBrand(name))
    }
    const handleBrandNameChange = (e) => {
        const brand = e.target.value
        setBrandName(brand)
        handleUpdateValidate(brand)
    }
    const handleUpdateValidate = (name) => {
        if (name.length === 0) {
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
                            handleCreateBrand(brandName)
                            dispatch(getAllBrands())
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateBrand
