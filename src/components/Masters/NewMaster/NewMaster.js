import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import styles from './NewMaster.module.css'
import {Button, TextField} from "@material-ui/core";
import {insertMaster} from "../../../redux/actions/masters";
import SaveIcon from "@material-ui/icons/Save";
import {Autocomplete} from "@material-ui/lab";

const NewMaster = () => {
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [experience, setExperience] = useState('')
    const [firm, setFirm] = useState()
    const [post, setPost] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience)
    }
    const handleExperienceChange = (e) => {
        const exp = e.target.value
        setExperience(exp)
        notEmptyFieldsValidation(lastname, firstname, middlename, experience)
    }
    const notEmptyFieldsValidation = (lastname, firstname, middlename, experience) => {
        if (lastname.length && firstname.length && middlename.length && experience.length) {
            setDisable(false)
        }
        else setDisable(true)
    }

    const handleInsertMaster = () => {
        dispatch(insertMaster())
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
                                value={experience}
                                helperText={middlename === "" ? 'Обязательное поле' : ' '}
                                onChange={handleExperienceChange}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
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
