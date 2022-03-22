import React from "react";
import './Search.css';
import searchImg from '../../images/search.svg';
import Checkbox from "../Checkbox/Checkbox";

function Search() {
    return(
        <div className="search">
            <form className="search__elements">
                <input className="search__input" placeholder="Фильм"/>
                <button className="search__btn" style={{ backgroundImage: `url(${searchImg})` }}></button>
            </form>
            <Checkbox />
        </div>
    )
}

export default Search;