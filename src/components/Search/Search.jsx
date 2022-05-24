import React, { useContext, useState } from "react";
import './Search.css';
import searchImg from '../../images/search.svg';
import Checkbox from "../Checkbox/Checkbox";

function Search({ formSubmitHandler, inputValue, searchInputChangeHandler }) {


    return (
        <div className="search">
            <form className="search__elements" onSubmit={formSubmitHandler}>
                <input className="search__input" placeholder="Фильм" required value={inputValue} onChange={searchInputChangeHandler} />
                <button type="submit" className="search__btn" style={{ backgroundImage: `url(${searchImg})` }}></button>
            </form>
            <Checkbox />
        </div>
    )
}

export default Search;