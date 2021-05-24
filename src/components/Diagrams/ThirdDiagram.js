import React, {useEffect, useState} from 'react'
import styles from './Diagrams.module.css'
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {getAllCities} from "../../redux/actions/cities";
import {get3DDiagram} from "../../redux/actions/diagrams";
import ReactFusioncharts from "react-fusioncharts";

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
            chart: {
                caption: "Количество самых некачественных брендов по городу",
                xaxisname: "Годы",
                yaxisname: "Количество техники",
                formatnumberscale: "1",
                plottooltext:
                    "<b>$dataValue</b> количество техники марки <b>$seriesName</b> в городе $label",
                theme: "fusion"
            },
            categories: [
                {
                    category: [
                        {
                            label: thirdDiagram.result[0]?.name
                        },
                    ]
                }
            ],
            dataset: [
                {
                    seriesname: thirdDiagram.result[0]?.brand,
                    data: [
                        {
                            value: thirdDiagram.result[0]?.count,
                        },
                    ]
                },
                {
                    seriesname: thirdDiagram.result[1]?.brand,
                    data: [
                        {
                            value:thirdDiagram.result[1]?.count,
                        },
                    ]
                },
                {
                    seriesname: thirdDiagram.result[2]?.brand,
                    data: [
                        {
                            value: thirdDiagram.result[2]?.count,
                        },
                    ]
                }
            ]
        };
    }
    console.log(thirdDiagram)
    const handleSubmit = () => {
        dispatch(get3DDiagram(cityId))
    }
    return (
        <div>
            <div className={styles.autocomplete}>
                <Autocomplete
                    id="autocomplete"
                    className={styles.combo_box}
                    options={cities}
                    autoHighlight
                    disableClearable
                    style={{ width: 200 }}
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
            {thirdDiagram &&
            <ReactFusioncharts
                type="mscolumn3d"
                width="100%"
                height="50%"
                dataFormat="JSON"
                dataSource={dataSource}
            />}
        </div>
    )
}

export default ThirdDiagram
