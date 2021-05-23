import React from 'react'
import styles from './Header.module.css'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Link to='/clients'>Клиенты</Link>
            </div>
            <div>
                <Link to='/devices'>Техника</Link>
            </div>
            <div>
                <Link to='/firms'>Фирмы</Link>
            </div>
            <div>
                <Link to='/masters'>Мастера</Link>
            </div>
            <div>
                <Link to='/orders'>Заказы</Link>
            </div>
            <div>
                <Link to='/repairs'>Работы</Link>
            </div>
            <div>
                <Link to='/references'>Справочники</Link>
            </div>
            <div>
                <Link to='/complex-queries'>Запросы</Link>
            </div>
            <div>
                <Link to='/diagrams'>Диаграммы</Link>
            </div>
        </div>
    );
}

export default Header;
