
import Clients from "./components/Clients/Clients";
import {Route, Switch} from "react-router";
import Header from "./components/Header/Header";
import './App.css'

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="content">
                <Switch>
                    <Route exact path='/clients' component={Clients}/>
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
