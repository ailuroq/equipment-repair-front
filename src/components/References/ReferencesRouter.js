import React from 'react'
import {Route, Switch} from "react-router";
import styles from './References.module.css'
import Brands from "./Brands/Brands";
import Cities from "./Cities/Cities";
import Countries from "./Countries/Countries";
import Posts from "./Posts/Posts";
import Works from "./Works/Works";
import {Link} from "react-router-dom";

const ReferencesRouter = () => {
    return (
        <div>
            <div>
                <ul className={styles.references_header}>
                    <li><Link to='/references/brands'>Марки</Link></li>
                    <li><Link to='/references/cities'>Города</Link></li>
                    <li><Link to='/references/countries'>Страны</Link></li>
                    <li><Link to='/references/posts'>Должности</Link></li>
                    <li><Link to='/references/works'>Виды работ</Link></li>
                </ul>
            </div>
            <Switch>
                <Route exact path='/references/brands' component={Brands}/>
                <Route exact path='/references/cities' component={Cities}/>
                <Route exact path='/references/countries' component={Countries}/>
                <Route exact path='/references/posts' component={Posts}/>
                <Route exact path='/references/works' component={Works}/>
            </Switch>
        </div>
    )
}

export default ReferencesRouter
