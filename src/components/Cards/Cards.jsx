import React from "react";
import './Cards.css';
import Card from "../Card/Card";
import { initialSearchCards, initialSavedCards } from "../../constants/const"

function Cards({ cardsList }) {

    const searchCardsList = initialSearchCards;
    const savedCardsList = initialSavedCards;


    return (
        <section className="cards">
            {cardsList === "searchCards" ? (
                searchCardsList.map((card) => {
                    return <Card title={card.title} img={card.link} cardsList={cardsList} />
                })
            ) : (
                savedCardsList.map((card) => {
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