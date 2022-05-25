import React from "react";
import './Card.css';
import { useLocation } from "react-router-dom";

const imagesHost = 'https://api.nomoreparties.co';

function Card({movie, clickHandler}) {

    const {
        title,
        image,
        isActive,
    } = movie;

    const img = typeof image === 'string' ? image : imagesHost + image.url;

    const location = useLocation();

    const renderIcon = () => {
        if (location.pathname === "/saved-movies") {
            return 'card__delete'
        } else {
            return `card__like ${isActive ? 'card__like_active' : ''}`
        }
    }

    const onClick = (e) => {
        e.preventDefault();
        clickHandler(movie);
    }

    return (
        <>
            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">{title}</h2>
                        <p className="card__duration">{isActive ? 'my' : 'not my'}</p>
                    </div>
                    <button className={renderIcon()} onClick={onClick}></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={img} />
            </article>

        </>
    )
}

export default Card;