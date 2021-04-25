import React from 'react'
import {Route, Switch} from "react-router";
import Masters from "./Masters";
import NewMaster from "./NewMaster/NewMaster";

const MastersRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/masters' component={Masters}/>
                <Route exact path='/masters/new' component={NewMaster}/>
                {/*<Route exact path='/clients/view/:id' component={ViewClient}/>
                <Route exact path='/clients/edit/:id' component={EditClient}/>
                <Route exact path='/clients/new' component={NewClient}/>*/}
            </Switch>
        </div>
    )
}

export default MastersRouter
