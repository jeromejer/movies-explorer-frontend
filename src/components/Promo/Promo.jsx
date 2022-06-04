import React from "react";
import './Promo.css';
import promoImg from '../../images/web.svg'

function Promo() {
    return(
        <section className="promo">
            <div className="promo__content">
                <div className="promo__info">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="promo__btn">Узнать больше</button>
                </div>
                <div className="promo__img" style={{ backgroundImage: `url(${promoImg})` }} alt="Картинка" />
            </div>
        </section>
    )
}

export default Promo;