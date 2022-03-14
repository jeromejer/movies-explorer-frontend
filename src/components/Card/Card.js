import React from "react";
import './Card.css';
import cardImg from '../../images/film.jpg';
import cardImgFilm from '../../images/film2.jpg'

function Card() {
    return(
        <>
            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">33 слова о дизайне</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like card__like_active"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImg}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">Киноальманах «100 лет дизайна»</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like card__like_active"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImgFilm}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">В погоне за Бенкси</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImgFilm}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">33 слова о дизайне</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like card__like_active"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImg}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">33 слова о дизайне</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like card__like_active"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImg}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">В погоне за Бенкси</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImgFilm}/>
            </article>

            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">33 слова о дизайне</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className="card__like card__like_active"></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={cardImg}/>
            </article>
        </>
    )
}

export default Card;