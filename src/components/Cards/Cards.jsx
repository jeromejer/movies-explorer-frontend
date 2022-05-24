import React from "react";
import './Cards.css';
import Card from "../Card/Card";
import api from "../../utils/MainApi";

function Cards(props) {

    const { movies: moviesList, userMoviesList } = props

    console.log(' RENDER Cards')
    // const [userMoviesList, setUserMoviesList] = React.useState([]);


    // React.useEffect(() => {
    //     api
    //       .getSaveMovies()
    //       .then((moviesList) => {
    //         if (moviesList) {
    //             setUserMoviesList(moviesList.map((i) => i.movieId));
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //   }, []);

    return (
        <section className="cards">
            { moviesList && moviesList.map((movie) => {
                const isActive = userMoviesList && userMoviesList.indexOf(movie.id)>-1;
                return (<Card {...movie} title={movie.nameRU || movie.nameEN} isActive={isActive}/>)}
            )}

            { moviesList.length ? 
            <div className="cards__btn-block">
                <button className="cards__btn">Ещё</button>
            </div>: ''}

        </section>
    )
}

export default Cards;