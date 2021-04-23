import React, {useState} from 'react'
import styles from "./NewClient.module.css";
import {Button, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const NewDevice = () => {
    const [brand, setBrand] = useState('')
    const [country, setCountry] = useState()
    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [photo, setPhoto] = useState('')

    const handleBrandChange = (e) => {
        const brand = e.target.value
        setBrand(brand)
    }

    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name)
    }

    const handleModelChange = (e) => {
        const model = e.target.value
        setModel(model)
    }

    return (
        <div className={styles.new_device}>
            <div className={styles.device_border}>
                <form noValidate autoComplete="off">
                    <div className={styles.new_device_forms}>
                        <input
                            accept="image/*"
                            className={styles.upload}
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{display:'none'}}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{width: '190px'}}>
                                Загрузить фотографию
                            </Button>
                        </label>
                        <TextField
                            className={styles.text_field_device_item}
                            id="brand"
                            label="Марка"
                            value={brand}
                            helperText={brand === "" ? 'Обязательное поле' : ' '}

                            onChange={handleBrandChange}
                        />
                        <TextField
                            className={styles.text_field_device_item}
                            id="name"
                            label="Название"
                            value={name}
                            helperText={name === "" ? 'Обязательное поле' : ' '}

                            onChange={handleNameChange}
                        />
                        <TextField
                            className={styles.text_field_device_item}
                            id="model"
                            label="Модель"
                            value={model}
                            helperText={model === "" ? 'Обязательное поле' : ' '}
                            onChange={handleModelChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewDevice