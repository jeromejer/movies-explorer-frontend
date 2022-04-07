import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation({loggedIn}) {

    const linkProfile = <Link className="nav__account" to="/profile">Аккаунт</Link>;
    const linkMovies = <Link className="nav__link" to="/movies">Фильмы</Link>;
    const linkSaveMovies = <Link className="nav__link" to="/saved-movies">Сохраненные фильмы</Link>;
    const linkMain = <Link className="nav__link" to="/">Главная</Link>;


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
                                {linkMovies}
                                {linkSaveMovies}
                            </div>
                            {linkProfile}
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
                                {linkMain}
                                {linkMovies}
                                {linkSaveMovies}
                            </div>
                            {linkProfile}
                        </div>
                    </div>
                </nav>
    )
}

export default Navigation;