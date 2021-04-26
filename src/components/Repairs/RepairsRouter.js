import React from 'react'
import {Route, Switch} from "react-router";
import Repairs from "./Repairs";

const RepairsRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/repairs' component={Repairs}/>
            </Switch>
        </div>
    )
}

export default RepairsRouter
