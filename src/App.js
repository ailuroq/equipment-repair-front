
import Clients from "./components/Clients/Clients";
import {Route, Switch} from "react-router";
import Header from "./components/Header/Header";
import ViewClient from "./components/Clients/ViewClient/ViewClient";
import './App.css'
import EditClient from "./components/Clients/EditClient/EditClient";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="content">
                <Switch>
                    <Route exact path='/clients' component={Clients}/>
                    <Route exact path='/clients/view/:id' component={ViewClient}/>
                    <Route exact path='/clients/edit/:id' component={EditClient}/>
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
