import React from 'react'
import {Route, Switch} from "react-router";
import Repairs from "./Repairs";
import EditRepair from "./EditRepair/EditRepair";
import NewRepair from "./NewRepair/NewRepair";
import ViewRepair from "./ViewRepair/ViewRepair";

const RepairsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/repairs' component={Repairs}/>
                <Route exact path='/repairs/edit/:id' component={EditRepair}/>
                <Route exact path='/repairs/view/:id' component={ViewRepair}/>
                <Route exact path='/repairs/new' component={NewRepair}/>
            </Switch>
        </div>
    )
}

export default RepairsRouter
