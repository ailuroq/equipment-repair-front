import React, {useEffect, useState} from 'react'
import ThirdDiagram from "./ThirdDiagram";
import FirstDiagram from "./FirstDiagram";
import SecondDiagram from "./SecondDiagram";


const Diagrams = () => {
    return (
        <div>
            <FirstDiagram/>
            <SecondDiagram/>
            <ThirdDiagram/>
        </div>
    )
}

export default Diagrams
