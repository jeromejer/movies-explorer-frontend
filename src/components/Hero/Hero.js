import React from "react";
import Header from "../Header/Header";
import './Hero.css';
import heroImg from '../../images/web.svg'

function Hero() {
    return(
        <section className="hero">
            <Header />
            <div className="hero__content">
                <div className="hero__info">
                    <h1 className="hero__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="hero__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="hero__btn">Узнать больше</button>
                </div>
                <div className="hero__img" style={{ backgroundImage: `url(${heroImg})` }} alt="Картинка" />
            </div>
        </section>
    )
}

export default Hero;