import React from 'react'
import {Route, Switch} from "react-router";
import Orders from "./Orders";
import EditOrder from "./EditOrder/EditOrder";
import ViewOrder from "./ViewOrder/ViewOrder";
import NewOrder from "./NewOrder/NewOrder";

const OrdersRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/orders' component={Orders}/>
                <Route exact path='/orders/edit/:id' component={EditOrder}/>
                <Route exact path='/orders/view/:id' component={ViewOrder}/>
                <Route exact path='/orders/new' component={NewOrder}/>
            </Switch>
        </div>
    )
}

export default OrdersRouter
