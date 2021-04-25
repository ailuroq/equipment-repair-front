import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styles from './NewMaster.module.css'
import {Button, TextField} from "@material-ui/core";
import {getInsertMasterInfo, insertMaster} from "../../../redux/actions/masters";
import SaveIcon from "@material-ui/icons/Save";
import {Autocomplete} from "@material-ui/lab";

const NewMaster = () => {
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [experience, setExperience] = useState()
    const [firm, setFirm] = useState()
    const [post, setPost] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const firms = useSelector((state) => state.masters.insertInfo.firms)
    const posts = useSelector((state) => state.masters.insertInfo.posts)

    useEffect(() => {
       dispatch(getInsertMasterInfo())
    }, [dispatch])

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience, post, firm)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience, post, firm)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience, post, firm)
    }
    const handleExperienceChange = (e) => {
        const exp = e.target.value
        setExperience(exp)
        notEmptyFieldsValidation(lastname, firstname, middlename, exp, post, firm)
    }

    const notEmptyFieldsValidation = (lastname, firstname, middlename, experience,post , firm) => {
        if (lastname.length && firstname.length && middlename.length && experience && !!post && !!firm) {
            setDisable(false)
        }
        else setDisable(true)
    }

    const handleInsertMaster = () => {
        dispatch(insertMaster(lastname, firstname, middlename, experience, post, firm))
    }
    return (
        <div className={styles.new_master}>
            <div>
                <h2>Добавить мастера</h2>
            </div>
            <div>
                <form noValidate autoComplete="off">
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
                            <TextField
                                className={styles.text_field_item}
                                id="experience"
                                label="Опыт работы"
                                type="number"
                                value={experience}
                                helperText={middlename === "" ? 'Обязательное поле' : ' '}
                                onChange={handleExperienceChange}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="firms"
                                className={styles.combo_box}
                                options={firms}
                                autoHighlight
                                style={{ width: 200 }}
                                getOptionLabel={(option) => option.id + ' ' + option.name}
                                onChange={(e, value) => {
                                    if (value) setFirm(value.id)
                                    notEmptyFieldsValidation(lastname, firstname, middlename, experience, post, value)
                                    console.log(value)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите фирму"
                                        variant="outlined"
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
                                id="posts"
                                className={styles.combo_box}
                                options={posts}
                                autoHighlight
                                style={{ width: 200 }}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => {
                                    if (value) setPost(value.id)
                                    notEmptyFieldsValidation(lastname, firstname, middlename, experience, value, firm)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выберите должность"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </form>
                <div className={styles.insert_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={handleInsertMaster}
                        disabled={disable}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewMaster
