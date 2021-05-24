import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {get1DDiagram, get2DDiagram, get3DDiagram} from "../../redux/actions/diagrams";
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFusioncharts from "react-fusioncharts";
import {getAllCities} from "../../redux/actions/cities";
import styles from "../Devices/EditDevice/EditDevice.module.css";
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import ThirdDiagram from "./ThirdDiagram";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Diagrams = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get1DDiagram())
        dispatch(get2DDiagram())
    }, [dispatch])

    const firstDiagram = useSelector(state => state.diagrams.diagram1DData)
    const secondDiagram = useSelector(state => state.diagrams.diagram2DData)
    //const thirdDiagram = useSelector(state => state.diagrams.diagram3DData)
    const chartConfigs3D = {
        type: "pie2d",
        width: "100%",
        height: "550",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Процентное соотношение должностей",
                showvalues: "1",
                showpercentintooltip: "0",
                enablemultislicing: "1",
                theme: "fusion"
            },
            data: firstDiagram.queryResult
        }
    }
    return (
        <div>
            <ReactFC {...chartConfigs3D} />
            <Bar
                data={secondDiagram}
                options={{
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <ThirdDiagram/>
        </div>
    )
}

export default Diagrams
