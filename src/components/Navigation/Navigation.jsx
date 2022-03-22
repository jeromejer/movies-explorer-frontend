import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation({loggedIn}) {

    function handleNavMenuOpen() {
        const navBar = document.querySelector('.nav__menu');

        navBar.classList.add('nav__menu_open')
    }

    function handleNavMenuClose() {
        const navBar = document.querySelector('.nav__menu');

        navBar.classList.remove('nav__menu_open')
    }

    return(
                <nav className="nav">
                    {loggedIn ? (
                        <div className="nav__block">
                            <div className="nav__links">
                                <Link className="nav__link" to="/movies">Фильмы</Link>
                                <Link className="nav__link" to="/saved-movies">Сохраненные фильмы</Link>
                            </div>
                            <Link className="nav__account" to="/profile">Аккаунт</Link>
                        </div>
                    ) : (
                        <div className="nav__auth">
                            <Link className="nav__register" to="/signup">Регистрация</Link>
                            <Link className="nav__login" to="/signin">Войти</Link>
                        </div>
                    )}
                    <button className="nav__bar" onClick={handleNavMenuOpen}></button>
                    <div className="nav__menu">
                        <div className="nav__menu-container">
                            <button className="nav__close" onClick={handleNavMenuClose}></button>
                            <div className="nav__links">
                                <Link className="nav__link" to="/">Главная</Link>
                                <Link className="nav__link nav__link_active" to="/movies">Фильмы</Link>
                                <Link className="nav__link" to="/saved-movies">Сохраненные фильмы</Link>
                            </div>
                            <Link className="nav__account" to="/profile">Аккаунт</Link>
                        </div>
                    </div>
                </nav>
    )
}

export default Navigation;