import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import headerLogo from '../../images/logo.svg'

function Header() {
    return(
        <header className="header">
                <nav className="header__nav">
                    <img className="header__logo" src={headerLogo} alt="Логотип" /> 
                    <div className="header__link">
                        <Link className="header__register" to="/sign-in">Регистрация</Link>
                        <Link className="header__auth" to="/sign-in">Войти</Link>
                    </div>
                </nav>
        </header>
    )
}

export default Header;