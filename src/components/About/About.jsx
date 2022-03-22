import React from "react";
import './About.css';

function About() {
    return(
        <section className="about">
            <div className="about__content">
                <h2 className="about__title">О проекте</h2>
                <div className="about__column">
                    <div className="about__text">
                        <p className="about__info">Дипломный проект включал 5 этапов</p>
                        <p className="about__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about__text">
                        <p className="about__info">На выполнение диплома ушло 5 недель</p>
                        <p className="about__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about__week">
                    <div className="about__backend">
                        <p className="about__backend-title">1 неделя</p>
                        <p className="about__backend-subtitle">Back-end</p>
                    </div>
                    <div className="about__frontend">
                        <p className="about__frontend-title">4 недели</p>
                        <p className="about__frontend-subtitle">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;