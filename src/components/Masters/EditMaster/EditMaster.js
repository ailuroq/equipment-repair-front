import React, {useEffect, useState} from 'react'
import styles from './EditMaster.module.css'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUpdateMasterInfo, updateMaster} from "../../../redux/actions/masters";
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";

const EditMaster = () => {
    const {id} = useParams()
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [experience, setExperience] = useState()
    const [firmId, setFirmId] = useState()
    const [postId, setPostId] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const updateData = useSelector(state => state.masters.updateData)
    console.log(updateData)
    useEffect(() => {
        dispatch(getUpdateMasterInfo(id))
    }, [dispatch, id])

    useEffect(() => {
        if (updateData.current) {
            setLastname(updateData.current?.lastname)
            setFirstname(updateData.current?.firstname)
            setMiddlename(updateData.current?.middlename)
            setExperience(updateData.current?.experience)
            setFirmId(updateData.current?.firmid)
            setPostId(updateData.current?.postid)
            console.log(updateData)
        }
    }, [updateData])
    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
        fieldsValidation(lastname, firstname, middlename, experience, firmId, postId)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
        fieldsValidation(lastname, firstname, middlename, experience, firmId, postId)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
        fieldsValidation(lastname, firstname, middlename, experience, firmId, postId)
    }
    const handleExperienceChange = (e) => {
        const experience = e.target.value
        setExperience(experience)
        fieldsValidation(lastname, firstname, middlename, experience, firmId, postId)
    }
    const fieldsValidation = (lastname, firstname, middlename, experience, firmId, postId) => {
        if (lastname === updateData.current?.lastname
        && firstname === updateData.current?.firstname
        && middlename === updateData.current?.middlename
        && experience === Number(updateData.current?.experience)
        && firmId === updateData.current?.firmid
        && postId === updateData.current?.postid) {
            setDisable(true)
        } else setDisable(false)
    }
    const handleSubmit = () => {
        console.log(id, lastname, firstname, middlename, experience, firmId, postId)
        dispatch(updateMaster(id, lastname, firstname, middlename, experience, firmId, postId))
    }

    return (
        <div>

            <div className={styles.forms}>
                <div>
                    <TextField
                        className={styles.text_field_item}
                        helperText={lastname === "" ? 'Обязательное поле' : ' '}
                        id="lastname"
                        label="Фамилия"
                        value={lastname}
                        onChange={handleLastnameChange}
                    />
                </div>
                <div>
                    <TextField
                        className={styles.text_field_item}
                        id="firstname"
                        label="Имя"
                        value={firstname}
                        helperText={firstname === "" ? 'Обязательное поле' : ' '}
                        onChange={handleFirstnameChange}
                    />
                </div>
                <div>
                    <TextField
                        className={styles.text_field_item}
                        id="middlename"
                        label="Отчество"
                        value={middlename}
                        helperText={middlename === "" ? 'Обязательное поле' : ' '}
                        onChange={handleMiddlenameChange}
                    />
                </div>
                <div>
                    <Autocomplete
                        id="brands"
                        className={styles.combo_box}
                        options={updateData.firms}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setFirmId(value.id)
                                fieldsValidation(lastname, firstname, middlename, experience, value.id, postId)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                helperText='Фирмы'
                                variant="outlined"
                                label={updateData.current?.firmid + '  ' + updateData.current?.firm}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>
                <div>
                    <Autocomplete
                        id="brands"
                        className={styles.combo_box}
                        options={updateData.posts}
                        autoHighlight
                        disableClearable
                        style={{ width: 200 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setPostId(value.id)
                                fieldsValidation(lastname, firstname, middlename, experience, firmId, value.id)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                helperText='Должности'
                                variant="outlined"
                                label={updateData.current?.postid + '  ' + updateData.current?.post}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        className={styles.text_field_item}
                        id="experience"
                        helperText='Опыт работы'
                        value={experience}
                        type='number'
                        onChange={handleExperienceChange}
                    />
                </div>

            </div>
            <div className={styles.update_button}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={disable}
                    onClick={handleSubmit}
                >
                    Обновить
                </Button>
            </div>
        </div>
    )
}

export default EditMaster
