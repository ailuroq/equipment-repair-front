import React, {useEffect, useState} from 'react'
import styles from './Diagrams.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {getAllCities} from "../../redux/actions/cities";
import {get3DDiagram} from "../../redux/actions/diagrams";
import {Bar} from "react-chartjs-2";

const ThirdDiagram = () => {

    const [cityId, setCityId] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCities())
    }, [dispatch])

    const {cities} = useSelector(state => state.cities.cityData)
    const thirdDiagram = useSelector(state => state.diagrams.diagram3DData)
    let dataSource;
    if (thirdDiagram.result) {
        dataSource = {
            labels: [thirdDiagram.result[0].name, thirdDiagram.result[1].name, thirdDiagram.result[2].name],
            datasets: [
                {
                    label: 'Количество техники',
                    backgroundColor: [
                        'rgb(61,252,109)',
                    ],
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [thirdDiagram.result[0].count, thirdDiagram.result[1].count, thirdDiagram.result[2].count]
                }
            ]
        };
    }
    console.log(dataSource)
    const handleSubmit = () => {
        dispatch(get3DDiagram(cityId))
    }
    return (
        <div className={styles.third_diagram}>
            <div className={styles.autocomplete}>
                <Autocomplete
                    id="autocomplete"
                    className={styles.combo_box}
                    options={cities}
                    autoHighlight
                    disableClearable
                    style={{width: 200}}
                    getOptionLabel={(option) => option.id + ' ' + option.name}
                    onChange={(e, value) => {
                        if (value) {
                            setCityId(value.id)
                            setDisable(false)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            helperText={'Выберите город'}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </div>
            <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disabled={disable}
            >Построить диаграмму
            </Button>
            {dataSource &&
            <Bar data={dataSource}/>}
        </div>
    )
}

export default ThirdDiagram
