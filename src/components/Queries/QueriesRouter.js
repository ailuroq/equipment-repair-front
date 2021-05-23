import React from 'react'
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import ThirdQuery from "./ComplexQueries/ThirdQuery/ThirdQuery";
import SecondQuery from "./ComplexQueries/SecondQuery/SecondQuery";
import styles from './Queries.module.css'
import FirstQuery from "./ComplexQueries/FirstQuery/FirstQuery";
import DoneMasterOrdersPerPeriod from "./LabQueries/DoneMasterOrdersPerPeriod";
import BrandAndItDevices from "./LabQueries/BrandAndItDevices";
import NotMadeOrders from "./LabQueries/NotMadeOrders";
import CountMastersPerFirm from "./LabQueries/CountMastersPerFirm";
import GroupDevicesByCountries from "./LabQueries/GroupDevicesByCountries";
import GroupRepairsByType from "./LabQueries/GroupRepairsByType";
import CountOrdersPerFirm from "./LabQueries/CountOrdersPerFirm";
import TheMostExpensiveOrder from "./LabQueries/TheMostExpensiveOrder";
import MoreThanAvgExp from "./LabQueries/MoreThanAvgExp";
import NoOrderPerPeriod from "./LabQueries/NoOrderPerPeriod";

const QueriesRouter = () => {
    return (
        <div className={styles.queries}>
            <div className={styles.queries_header}>
                <ul>
                    <li><Link to='/complex-queries/first'>Первый запрос</Link></li>
                    <li><Link to='/complex-queries/second'>Второй запрос</Link></li>
                    <li><Link to='/complex-queries/third'>Третий запрос</Link></li>
                </ul>
                <p><Link to='/complex-queries/done-master-orders-per-period'>Список выполненных/невыполненных заказов мастера</Link></p>
                <p><Link to='/complex-queries/brand-and-its-devices'>Выбрать производителя и всю его технику</Link></p>
                <p><Link to='/complex-queries/list-not-made-orders'>Список всех невыполненных заказов</Link></p>
                <p><Link to='/complex-queries/count-masters-per-firm'>Подсчет количества мастеров в каждой фирме</Link></p>
                <p><Link to='/complex-queries/group-devices-by-counties'>Группировка техники по странам</Link></p>
                <p><Link to='/complex-queries/group-repairs-by-type'>Группировка работы по типу</Link></p>
                <p><Link to='/complex-queries/no-orders-per-period'>Фирмы у которых не было заказов в выбранном периоде</Link></p>
                <p><Link to='/complex-queries/count-orders-per-firm'>Количество заказов у каждой фирмы</Link></p>
                <p><Link>Количество заказов фирмы за указанный период</Link></p>
                <p><Link to='/complex-queries/the-most-expensive-order'>Самый дорогой заказ</Link></p>
                <p><Link to='/complex-queries/master-more-avg-exp'>Фирмы, у которых средний опыт работы сотрудников больше среднего</Link></p>
            </div>
            <hr/>
            <Switch>
                <Route exact path='/complex-queries/first' component={FirstQuery}/>
                <Route exact path='/complex-queries/second' component={SecondQuery}/>
                <Route exact path='/complex-queries/third' component={ThirdQuery}/>

                <Route exact path='/complex-queries/done-master-orders-per-period' component={DoneMasterOrdersPerPeriod}/>
                <Route exact path='/complex-queries/brand-and-its-devices' component={BrandAndItDevices}/>
                <Route exact path='/complex-queries/list-not-made-orders' component={NotMadeOrders}/>
                <Route exact path='/complex-queries/count-masters-per-firm' component={CountMastersPerFirm}/>
                <Route exact path='/complex-queries/group-devices-by-counties' component={GroupDevicesByCountries}/>
                <Route exact path='/complex-queries/group-repairs-by-type' component={GroupRepairsByType}/>
                <Route exact path='/complex-queries/count-orders-per-firm' component={CountOrdersPerFirm}/>
                <Route exact path='/complex-queries/the-most-expensive-order' component={TheMostExpensiveOrder}/>
                <Route exact path='/complex-queries/master-more-avg-exp' component={MoreThanAvgExp}/>
                <Route exact path='/complex-queries/no-orders-per-period' component={NoOrderPerPeriod}/>
            </Switch>
        </div>
    )
}

export default QueriesRouter
