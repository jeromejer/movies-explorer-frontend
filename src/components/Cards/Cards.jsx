import React, { useState, useEffect } from "react";
import './Cards.css';
import Card from "../Card/Card";
import { notfoundText } from "../../constants/const";
import { useWindowWidthResize } from "../../utils/hooks";


function Cards(props) {

    const { movies, clickHandler, errText } = props;

    const getCountItemsByWidth = () => {
        return (document.body.clientWidth > 480) * 2 + 5;
    };

    const defaultLength = getCountItemsByWidth();
    const [length, setLength] = useState(defaultLength);
    const [page, setPage] = useState(1);
    const [loadMoreBtnIsVisible, setloadMoreBtnIsVisible] = useState(movies.length > defaultLength)

    const windowWidth = useWindowWidthResize();

    useEffect(() => {
        setDefaultViewState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies, windowWidth]);

    const loadMore = () => {
        setPage(page + 1);
        setloadMoreBtnIsVisible(movies.length > (page + 1) * length);
    };

    const setDefaultViewState = () => {
        setPage(1);
        const l = getCountItemsByWidth();
        setLength(l);
        setloadMoreBtnIsVisible(movies.length > l);
    };

    return (
        <section className="cards">

            {movies
                .slice(0, page * length)
                .map((movie) => <Card movie={{ ...movie, title: (movie.nameRU || movie.nameEN) }} clickHandler={clickHandler} />)
            }

            {!movies.length &&
                <div className="cards__notfound">{notfoundText}</div>}

            <div className="cards__err">{errText}</div>

            {
                loadMoreBtnIsVisible ?
                    <div className="cards__btn-block">
                        <button className="cards__btn" onClick={loadMore}>Ещё</button>
                    </div> : ''
            }

        </section>
    )
}

export default Cards;