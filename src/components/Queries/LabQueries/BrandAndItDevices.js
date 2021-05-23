import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllBrands} from "../../../redux/actions/brands";
import {Autocomplete} from "@material-ui/lab";
import styles from "../Queries.module.css";
import {Button, TextField} from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import {getDevicesByBrand} from "../../../redux/actions/queries";
import {DataGrid} from "@material-ui/data-grid";

const BrandAndItDevices = () => {
    const columns = [
        {field: 'id', headerName: 'ID', width: 100, sortable: false},
        {field: 'name', headerName: 'Название', width: 160, sortable: false},
        {field: 'country', headerName: 'Страна', width: 200, sortable: false},
        {field: 'brand', headerName: 'Бренд', width: 160, sortable: false},
        {field: 'model', headerName: 'Модель', width: 140, sortable: false},
        {field: 'client', headerName: 'Клиент', witdh: 170, sortable: false},
    ]
    const [brandId, setBrandId] = useState()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const {devices} = useSelector(state => state.queries.deviceData)
    console.log(devices)
    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    const handleSubmit = () => {
        dispatch(getDevicesByBrand(brandId))
    }
    const {brands} = useSelector(state => state.brands.brandData)
    return (
        <div className={styles.brand_and_devices}>
            <div className={styles.brand_and_devices_grid}>
                {brands &&
                <div>
                    <Autocomplete
                        id="brands"
                        className={styles.combo_box}
                        options={brands}
                        autoHighlight
                        disableClearable
                        style={{ width: 250 }}
                        getOptionLabel={(option) => option.id + ' ' + option.name}
                        onChange={(e, value) => {
                            if (value) {
                                setBrandId(value.id)
                                setDisable(false)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Выберите производителя'
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />
                </div>}
                <div className={styles.brand_submit_button}>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={disable}
                    >Отправить</Button>
                </div>
            </div>
            {devices &&
            <div>
                <DataGrid
                    rows={devices}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50, 100, 200]}
                    autoHeight={true}
                    disableSelectionOnClick={true}
                />
            </div>}
        </div>
    )
}

export default BrandAndItDevices
