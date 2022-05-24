import React from "react";
import './Card.css';
import { useLocation } from "react-router-dom";
import api from "../../utils/MainApi";

const imagesHost = 'https://api.nomoreparties.co';

function Card( movie) {

    const {title, image, isActive } = movie;

    const img = typeof image === 'string' ? image : imagesHost + image.url;

    const location = useLocation();
    
    const [isSavedMovie, setIsSavedMovie] = React.useState(isActive || false);

    const renderIcon = (location) => {
        if (location.pathname === "/saved-movies") {
            return 'card__delete'
        } else {
            return `card__like ${isActive ? 'card__like_active' : ''}`
        }
    }

    function likeMovie() {
        if (!isSavedMovie) { 
        api
        .addMovie(movie)
        .then(() => {
            setIsSavedMovie(true)
            }) 
        } else {
            return;
        }
    }

    function deleteMovie() {
        api
        .deleteMovie(movie._id) 
        }

    function handleClickDeleteOrSaveMovie(e) {
        e.preventDefault();

        if (location.pathname === "/saved-movies") {
            deleteMovie()
        }
        else {
            likeMovie()
        }
    }

        
        return(
        <>
            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">{title}</h2>
                        <p className="card__duration">{isActive ? 'my' : 'not my'}</p>
                    </div>
                    <button className={renderIcon(location)} onClick={handleClickDeleteOrSaveMovie}></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={img} />
            </article>

        </>
    )
}

export default Card;