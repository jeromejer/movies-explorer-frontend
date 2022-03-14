import React from "react";
import './Cards.css';
import Card from "../Card/Card";

function Cards() {
    return(
        <section className="cards">
            <Card />
            <button className="cards__btn">Ещё</button>
        </section>
    )
}

export default Cards;