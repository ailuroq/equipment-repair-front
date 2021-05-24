import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {get1DDiagram} from "../../redux/actions/diagrams";
import {Pie} from "react-chartjs-2";
import styles from './Diagrams.module.css'
const FirstDiagram = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get1DDiagram())
    }, [dispatch])
    const firstDiagram = useSelector(state => state.diagrams.diagram1DData)
    console.log(firstDiagram.result)
    return (
        <div className={styles.first_diagram}>
            {firstDiagram &&
            <Pie
                data={firstDiagram.result}
            />}
        </div>
    )
}

export default FirstDiagram
