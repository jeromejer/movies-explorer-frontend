import React from "react";
import './Logo.css';
import headerLogo from '../../images/logo.svg'

function Logo() {
    return(
        <>
            <img className="logo" src={headerLogo} alt="Логотип" />
        </>
                
    )
}

export default Logo;