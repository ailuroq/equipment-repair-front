import React from 'react';
import styles from './Client.module.css'
import {Link} from "react-router-dom";

const Client = (props) => {
    return (
        <div className={styles.client}>
            <div>{props.lastname}</div>
            <div>{props.firstname}</div>
            <div>{props.middlename}</div>
            <div>{props.phone}</div>
            <div><Link>Техника</Link></div>
        </div>
    )
}

export default Client