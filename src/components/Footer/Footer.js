import React from "react";
import './Footer.css';

function Footer() {
    return(
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__info">
                    <p className="footer__copy">&copy; 2020</p>
                    <ul className="footer__links">
                        <li><a className="footer__item-link" href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                        <li><a className="footer__item-link" href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Github</a></li>
                        <li><a className="footer__item-link" href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Facebook</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;