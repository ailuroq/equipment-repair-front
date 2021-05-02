import React from 'react'
import {Route, Switch} from "react-router";
import Devices from './Devices'
import NewDevice from "./NewDevice/NewDevice";
import ViewDevice from "./ViewDevice/ViewDevice";
import EditDevice from "./EditDevice/EditDevice";

const DevicesRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/devices' component={Devices}/>
                <Route exact path='/devices/edit/:id' component={EditDevice}/>
                <Route exact path='/devices/view/:id' component={ViewDevice}/>
            </Switch>
        </div>
    )
}

export default DevicesRouter
