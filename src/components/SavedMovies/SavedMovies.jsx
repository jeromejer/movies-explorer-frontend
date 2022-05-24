import React, { useState } from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";
import Preloader from "../Preloader/Preloader";
import api from "../../utils/MainApi";

function SavedMovies({loggedIn}) {
console.log('wtf')

  const [inputValue, setInputValue] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoader, setIsLoader] = React.useState(false);

  React.useEffect(() => {
    api
      .getSaveMovies()
      .then((movies) => {
        if (movies) {
          setSavedMovies(movies);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoader(false);
      })

  }, []);

  const getSavedMovies = (search = '') => {
    setIsLoader(true);

    api
    .getSaveMovies()
    .then((movies) => {
        const regular = new RegExp(search, 'i');
        const filtered = movies.filter(movie => {
          const { nameRU, nameEN } = movie;
          return regular.test(nameRU) || regular.test(nameEN);
        });

        setIsLoader(false);
        setSavedMovies(filtered);
    })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    getSavedMovies(inputValue);
}

const searchInputChangeHandler = (e) => {
  setInputValue(e.target.value);
}


    return (
      <>
        <Header loggedIn={loggedIn} />
        <Search formSubmitHandler={formSubmitHandler} searchInputChangeHandler={searchInputChangeHandler} inputValue={inputValue}/>
        {isLoader &&  <Preloader />}
        {!isLoader &&  <Cards movies={savedMovies} />}
        <Footer />
      </>
    );
  }
  
  export default SavedMovies;