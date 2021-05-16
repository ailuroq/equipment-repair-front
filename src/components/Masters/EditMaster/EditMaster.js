import React, {useEffect, useState} from 'react'
import styles from './EditMaster.module.css'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUpdateMasterInfo, updateMaster} from "../../../redux/actions/masters";
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

const EditMaster = () => {
    const {id} = useParams()
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [experience, setExperience] = useState()
    const [firmId, setFirmId] = useState()
    const [postId, setPostId] = useState()

    const dispatch = useDispatch()
    const updateData = useSelector(state => state.masters.updateData)
    console.log(updateData)
    useEffect(() => {
        dispatch(getUpdateMasterInfo(id))
    }, [dispatch, id])

    const handleLastnameChange = (e) => {
        const lastname = e.target.value
        setLastname(lastname)
    }
    const handleFirstnameChange = (e) => {
        const firstname = e.target.value
        setFirstname(firstname)
    }
    const handleMiddlenameChange = (e) => {
        const middlename = e.target.value
        setMiddlename(middlename)
    }
    const handleExperienceChange = (e) => {
        const experience = e.target.value
        setExperience(experience)
    }
    const handleSubmit = () => {
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
                    <TextField
                        className={styles.text_field_item}
                        id="phone"
                        label="Телефон"
                        type='number'
                        value={experience}
                        helperText={experience === "" ? 'Обязательное поле' : ' '}
                        onChange={handleExperienceChange}
                    />
                </div>
                {updateData &&
                <div>
                    <div>
                        <Autocomplete
                            id="brands"
                            className={styles.combo_box}
                            options={updateData.firms}
                            autoHighlight
                            disableClearable
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id-1 + ' ' + option.name}
                            onChange={(e, value) => {
                                if (value) {
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText='Марка'
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
                            id="brands"
                            className={styles.combo_box}
                            options={updateData.posts}
                            autoHighlight
                            disableClearable
                            style={{ width: 200 }}
                            getOptionLabel={(option) => option.id-1 + ' ' + option.name}
                            onChange={(e, value) => {
                                if (value) {
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText='Марка'
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default EditMaster
