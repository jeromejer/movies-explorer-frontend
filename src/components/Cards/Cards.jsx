import React from "react";
import './Cards.css';
import Card from "../Card/Card";

function Cards(props) {

    const { movies, clickHandler, movieDuration } = props;

    return (
        <section className="cards">

            {movies.map((movie) => <Card movie={{...movie, title: (movie.nameRU || movie.nameEN) }} clickHandler={clickHandler} movieDuration={movieDuration}/>)}

            {movies.length ?
                <div className="cards__btn-block">
                    <button className="cards__btn">Ещё</button>
                </div> : ''}

        </section>
    )
}

export default Cards;