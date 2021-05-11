import React from 'react'
import styles from "./Posts.module.css"
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createPostDialogOpen, findPost} from "../../../redux/actions/posts";
import {updateSearchValue} from "../../../redux/actions/search";
import CreatePost from "./CreatePost";

const FindPost = () => {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.search.searchValue)
    const handleSearchDataChange = (e) => {
        const searchData = e.target.value
        dispatch(updateSearchValue(searchData))
    }
    const handleFindFirm = () => {
        dispatch(findPost(searchData))
    }

    return (
        <div className={styles.find_or_add}>
            <div>
                <TextField className={styles.search_item} id="search" label="Поиск" value={searchData}
                           onChange={handleSearchDataChange}/>
            </div>
            <div>
                <Button
                    id={styles.find_button}
                    variant="outlined"
                    color="primary"
                    onClick={handleFindFirm}
                >Найти</Button>
            </div>
            <div>
                <Button id={styles.add_button} variant="outlined" color="primary" onClick={() => {
                    dispatch(createPostDialogOpen())
                }}>Добавить</Button>
            </div>

            <CreatePost/>
        </div>
    )
}

export default FindPost
