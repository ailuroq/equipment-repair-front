import React from 'react'
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import ThirdQuery from "./ComplexQueries/ThirdQuery/ThirdQuery";
import SecondQuery from "./ComplexQueries/SecondQuery/SecondQuery";

const QueriesRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/complex-queries/first'/>
                <Route exact path='/complex-queries/second' component={SecondQuery}/>
                <Route exact path='/complex-queries/third' component={ThirdQuery}/>
            </Switch>
        </div>
    )
}

export default QueriesRouter
