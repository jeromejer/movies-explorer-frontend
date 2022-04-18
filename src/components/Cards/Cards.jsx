import React from "react";
import { useLocation } from "react-router-dom";
import './Cards.css';
import Card from "../Card/Card";
import moviesApi from "../../utils/MoviesApi";

function Cards({ cardsList, cards, loggedIn }) {

    const { pathname } = useLocation();
    const [movies, setMovies] = React.useState(false);

    React.useEffect(() => {
        if (loggedIn) {
          moviesApi
            .getMoviesData()
            .then((data) => {
              setMovies(data);
              console.log(data)
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [loggedIn]);

    return (
        <section className="cards">
            {pathname === "/movies" ? (
                movies.map((card) => {
                    return <Card title={card.nameRU} img={card.image.url} cardsList={cardsList} />
                })
            ) : (
                movies.map((card) => {
                    return <Card title={card.title} img={card.link} cardsList={cardsList} />
                })
            )}
            <div className="cards__btn-block">
                {cardsList === "searchCards" ? (<>
                    <button className="cards__btn">Ещё</button>
                </>) : ('')}
            </div>

        </section>
    )
}

export default Cards;