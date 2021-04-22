import React from 'react'
import {Route, Switch} from "react-router";
import Clients from "./Clients";
import ViewClient from "./ViewClient/ViewClient";
import EditClient from "./EditClient/EditClient";
import NewClient from "./NewClient/NewClient";

const ClientsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/clients' component={Clients}/>
                <Route exact path='/clients/view/:id' component={ViewClient}/>
                <Route exact path='/clients/edit/:id' component={EditClient}/>
                <Route exact path='/clients/new' component={NewClient}/>
            </Switch>
        </div>
    )
}

export default ClientsRouter