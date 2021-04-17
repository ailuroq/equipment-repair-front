
import Clients from "./components/Clients/Clients";
import {Route, Switch} from "react-router";
import Header from "./components/Header/Header";
import ViewClient from "./components/Clients/ViewClient/ViewClient";
import './App.css'
import EditClient from "./components/Clients/EditClient/EditClient";
import ClientsRouter from "./components/Clients/ClientsRouter";
import DevicesRouter from "./components/Devices/DevicesRouter";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="content">
                <Switch>
                    <Route path='/clients' component={ClientsRouter}/>
                    <Route path='/devices' component={DevicesRouter}/>
                    {/*<Route path='/devices' component={Devices}/>
                    <Route path='/masters' component={Masters}/>
                    <Route path='/repair-firms' component={RepairFirms}/>
                    <Route path='/references' component={References}/>
                    <Route path='/orders' component={Orders}/>*/}
                </Switch>
            </div>
        </div>
    );
}

export default App;
