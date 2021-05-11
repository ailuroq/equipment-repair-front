import React, {useEffect, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, TextField} from "@material-ui/core";
import styles from "./Posts.module.css";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {updatePost, updatePostDialogClose} from "../../../redux/actions/posts";
import {useDispatch, useSelector} from "react-redux";

const UpdatePost = (props) => {
    console.log('current', props.currentValue)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [postName, setPostName] = useState('')
    const [postId, setPostId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const updateDialog = useSelector(state => state.posts.updateDialog)

    useEffect(() => {
        if (updateDialog) setUpdateDialogOpen(true)
        else setUpdateDialogOpen(false)
    }, [updateDialog])

    useEffect(() => {
        console.log('props', props)
        setPostId(props.currentValue.id)
        setPostName(props.currentValue.name)
    }, [props.currentValue])


    const handleUpdatePost = (id, name) => {
        console.log(id, name)
        dispatch(updatePost(id, name))
    }
    const handlePostNameChange = (e) => {
        const post = e.target.value
        setPostName(post)
        handleUpdateValidate(post)
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
        dispatch(updatePostDialogClose())
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
                    <TextField className={styles.text_field_item} id="name" label="Название" value={postName} onChange={handlePostNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        autoFocus
                        disable={disable}
                        onClick={()=>{
                            handleCloseUpdateDialog()
                            handleUpdatePost(postId, postName)
                        }}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdatePost
