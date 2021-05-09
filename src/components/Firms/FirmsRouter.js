import React from 'react'
import {Route, Switch} from "react-router";
import Firms from "./Firms";
import EditFirm from "./EditFirm/EditFirm";

const FirmsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/firms' component={Firms}/>
                <Route exact path='/firms/edit/:id' component={EditFirm}/>
            </Switch>
        </div>
    )
}

export default FirmsRouter
