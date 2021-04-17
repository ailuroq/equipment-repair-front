import React from 'react'
import {Route, Switch} from "react-router";
import Clients from "./Clients";
import ViewClient from "./ViewClient/ViewClient";
import EditClient from "./EditClient/EditClient";

const ClientsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/clients' component={Clients}/>
                <Route exact path='/clients/view/:id' component={ViewClient}/>
                <Route exact path='/clients/edit/:id' component={EditClient}/>
            </Switch>
        </div>
    )
}

export default ClientsRouter