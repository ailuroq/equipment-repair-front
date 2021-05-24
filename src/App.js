import {Route, Switch} from "react-router";
import Header from "./components/Header/Header";
import ClientsRouter from "./components/Clients/ClientsRouter";
import DevicesRouter from "./components/Devices/DevicesRouter";
import OrdersRouter from "./components/Orders/OrdersRouter";
import MastersRouter from "./components/Masters/MastersRouter";
import SuccessAlert from "./components/Alerts/SuccessAlert";
import ErrorAlert from "./components/Alerts/ErrorAlert";
import FirmsRouter from "./components/Firms/FirmsRouter";
import RepairsRouter from "./components/Repairs/RepairsRouter";
import './App.css'
import ReferencesRouter from "./components/References/ReferencesRouter";
import QueriesRouter from "./components/Queries/QueriesRouter";
import React from 'react'
import Diagrams from "./components/Diagrams/Diagrams";
import Login from "./components/Login/Login";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <SuccessAlert/>
            <ErrorAlert/>
            <div className="content">
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/clients' component={ClientsRouter}/>
                    <Route path='/devices' component={DevicesRouter}/>
                    <Route path='/orders' component={OrdersRouter}/>
                    <Route path='/masters' component={MastersRouter}/>
                    <Route path='/firms' component={FirmsRouter}/>
                    <Route path='/repairs' component={RepairsRouter}/>
                    <Route path='/references' component={ReferencesRouter}/>
                    <Route path='/complex-queries' component={QueriesRouter}/>
                    <Route path='/diagrams' component={Diagrams}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
