import React from "react";
import './Student.css';
import studentImg from '../../images/image.jpeg'
import array from '../../images/array.svg'

function Student() {
    return(
        <section className="student">
            <div className="student__content">
                <h2 className="student__title">Студент</h2>
                <div className="student__column">
                    <div className="student__info">
                        <h3 className="student__name">Александра</h3>
                        <p className="student__job">Фронтенд-разработчик, 30 лет</p>
                        <p className="student__about">Я родилась в Новосибирске, в 2020 году переехала в Москву и теперь
                        путешествую по России. Люблю космос, книги, настольные игры и фильмы про науку. Теперь к моему хобби 
                        добавилась веб-разработка, а после пройденного курса хобби превратилось в работу.</p>
                        <div className="student__social">
                            <a className="student__telegram student__social_link" href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Telegram</a>
                            <a className="student__github student__social_link" href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Github</a>
                        </div>
                    </div>
                    <img className="student__img" src={studentImg} alt="Фото"/>
                </div>

                <p className="student__portfolio">Портфолио</p>
                <ul className="student__list">
                    <li className="student__item">
                        <a className="student__item-link" style={{ backgroundImage: `url(${array})` }} href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Статичный сайт</a>
                    </li>
                    <li className="student__item">
                        <a className="student__item-link" style={{ backgroundImage: `url(${array})` }} href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                    </li>
                    <li className="student__item">
                        <a className="student__item-link" style={{ backgroundImage: `url(${array})` }} href="https://github.com/jeromejer" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Student;