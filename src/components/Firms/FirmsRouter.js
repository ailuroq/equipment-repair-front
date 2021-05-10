import React from 'react'
import {Route, Switch} from "react-router";
import Firms from "./Firms";
import EditFirm from "./EditFirm/EditFirm";
import NewFirm from "./NewFirm/NewFirm";
import ViewFirm from "./ViewFirm/ViewFirm";

const FirmsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/firms' component={Firms}/>
                <Route exact path='/firms/edit/:id' component={EditFirm}/>
                <Route exact path='/firms/new' component={NewFirm}/>
                <Route exact path='/firms/view/:id' component={ViewFirm}/>
            </Switch>
        </div>
    )
}

export default FirmsRouter
