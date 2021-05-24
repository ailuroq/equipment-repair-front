import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {get2DDiagram} from "../../redux/actions/diagrams";
import {Bar} from "react-chartjs-2";

const SecondDiagram = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get2DDiagram())
    }, [dispatch])
    const secondDiagram = useSelector(state => state.diagrams.diagram2DData)
    console.log(secondDiagram)
    return (
        <div>
            <Bar
                data={secondDiagram}
            />
        </div>
    )
}

export default SecondDiagram
