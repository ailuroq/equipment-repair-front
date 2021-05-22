import React from 'react'
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import ThirdQuery from "./ComplexQueries/ThirdQuery/ThirdQuery";
import SecondQuery from "./ComplexQueries/SecondQuery/SecondQuery";
import styles from './Queries.module.css'
import FirstQuery from "./ComplexQueries/FirstQuery/FirstQuery";
import DoneMasterOrdersPerPeriod from "./LabQueries/DoneMasterOrdersPerPeriod";

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
                <p><Link to='/complex-queries/'>Выбрать производителя и всю его технику</Link></p>
                <p><Link>Подсчет количества мастеров в каждой фирме</Link></p>
                <p><Link>Фирмы у которых нет заказов</Link></p>
                <p><Link>Группировка по типу работы</Link></p>
                <p><Link>Фирмы у которых не было заказов в выбранном периоде</Link></p>
                <p><Link>Количество заказов у каждой фирмы</Link></p>
                <p><Link>Количество заказов фирмы за указанный период</Link></p>
                <p><Link>Самый дорогой заказ</Link></p>
                <p><Link>Фирмы, у которых средний опыт работы сотрудников больше среднего</Link></p>
            </div>
            <Switch>
                <Route exact path='/complex-queries/first' component={FirstQuery}/>
                <Route exact path='/complex-queries/second' component={SecondQuery}/>
                <Route exact path='/complex-queries/third' component={ThirdQuery}/>

                <Route exact path='/complex-queries/done-master-orders-per-period' component={DoneMasterOrdersPerPeriod}/>
            </Switch>
        </div>
    )
}

export default QueriesRouter
