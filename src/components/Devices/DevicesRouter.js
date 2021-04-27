import React from 'react'
import {Route, Switch} from "react-router";
import Devices from './Devices'
import NewDevice from "./NewDevice/NewDevice";

const DevicesRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/devices' component={Devices}/>
                <Route exact path='/devices/edit/:id' component={NewDevice}/>
                {/*<Route exact path='/devices/view/:id' component={ViewClient}/>
                <Route exact path='/devices/edit/:id' component={EditClient}/>*/}
            </Switch>
        </div>
    )
}

export default DevicesRouter
