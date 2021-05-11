import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Posts.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {createPostDialogClose, getAllPosts, insertPost} from "../../../redux/actions/posts";

const CreatePost = () => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [postName, setPostName] = useState('')
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.posts.createDialog)
    console.log()
    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    const handleCreatePost = (name) => {
        dispatch(insertPost(name))
    }
    const handlePostNameChange = (e) => {
        const post = e.target.value
        setPostName(post)
        handleUpdateValidate(post)
    }
    const handleUpdateValidate = (name) => {
        console.log(name.length)
        if (!name.length) {
            console.log('true')
            setDisable(true)
        } else setDisable(false)
    }
    const handleCloseUpdateDialog = () => {
        dispatch(createPostDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={postName} onChange={handlePostNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        disabled={disable}
                        autoFocus
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleCreatePost(postName)
                            dispatch(getAllPosts())
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreatePost
