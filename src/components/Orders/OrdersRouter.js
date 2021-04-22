import React from 'react'
import {Route, Switch} from "react-router";
import Orders from "./Orders";

const OrdersRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/orders' component={Orders}/>
            </Switch>
        </div>
    )
}

export default OrdersRouter