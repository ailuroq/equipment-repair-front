import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

const NewFirm = () => {
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch()
    const cities = useSelector(state => state.firms.insertInfo.cities)
    return (
        <div>

        </div>
    )
}

export default NewFirm
