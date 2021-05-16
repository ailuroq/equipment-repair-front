import React from 'react'
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import ThirdQuery from "./ComplexQueries/ThirdQuery/ThirdQuery";
import SecondQuery from "./ComplexQueries/SecondQuery/SecondQuery";
import styles from './Queries.module.css'
import FirstQuery from "./ComplexQueries/FirstQuery/FirstQuery";

const QueriesRouter = () => {
    return (
        <div>
            <div className={styles.queries_header}>
                <ul>
                    <li><Link to='/complex-queries/first'>Первый запрос</Link></li>
                    <li><Link to='/complex-queries/second'>Второй запрос</Link></li>
                    <li><Link to='/complex-queries/third'>Третий запрос</Link></li>
                </ul>
            </div>
            <Switch>
                <Route exact path='/complex-queries/first' component={FirstQuery}/>
                <Route exact path='/complex-queries/second' component={SecondQuery}/>
                <Route exact path='/complex-queries/third' component={ThirdQuery}/>
            </Switch>
        </div>
    )
}

export default QueriesRouter
