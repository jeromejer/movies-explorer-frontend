import React from "react";
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({color, loggedIn}) {
    return(
        <header className={`header ${color}`}>
            <div className="header__block">
            <Link to="/" className="header__logo">
                <Logo />
            </Link>
                
                <Navigation loggedIn={loggedIn}/>
            </div>
        </header>
    )
}

export default Header;