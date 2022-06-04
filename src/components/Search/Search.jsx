import React from "react";
import './Search.css';
import searchImg from '../../images/search.svg';

function Search({ children, formSubmitHandler, inputValue, inputError, searchInputChangeHandler }) {

    return (
        <div className="search">
            <form className="search__elements" onSubmit={formSubmitHandler}>
                <input 
                    className="search__input"
                    placeholder="Фильм"
                    value={inputValue}
                    onChange={searchInputChangeHandler}
                    name="search"
                />
                <span 
                    className="search__error search__error_active">{inputError}</span>
                <button type="submit" className="search__btn" style={{ backgroundImage: `url(${searchImg})` }}></button>
            </form>
            {children}
        </div>
    )
}

export default Search;