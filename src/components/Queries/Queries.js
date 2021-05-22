import {Route, Switch} from "react-router";
import FirstQuery from "./ComplexQueries/FirstQuery/FirstQuery";
import SecondQuery from "./ComplexQueries/SecondQuery/SecondQuery";
import ThirdQuery from "./ComplexQueries/ThirdQuery/ThirdQuery";
import React from "react";

const Queries = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/complex-queries/first' component={FirstQuery}/>
                <Route exact path='/complex-queries/second' component={SecondQuery}/>
                <Route exact path='/complex-queries/third' component={ThirdQuery}/>
            </Switch>
        </div>
    )
}

export default Queries
