import React from 'react'
import {Route, Switch} from "react-router";
import Firms from "./Firms";

const FirmsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/firms' component={Firms}/>
            </Switch>
        </div>
    )
}

export default FirmsRouter
