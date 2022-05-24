import React, { useState } from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import { localStorageConst } from "../../constants/const";
import api from "../../utils/MainApi";
import { useLocation } from "react-router-dom";


function Movies({loggedIn}) {


    let initialMovies = [];
    try {
      initialMovies = JSON.parse(localStorage.getItem(localStorageConst.movies)) || [];
    }
    catch(e){}

    const initialSearch = localStorage.getItem(localStorageConst.moviesSearch) || '';

    const location = useLocation();
    
   

    const [movies, setMovies] = useState(initialMovies);
    const [inputValue, setInputValue] = useState(initialSearch);
    const [isLoader, setIsLoader] = React.useState(false);
    const [userMoviesList, setUserMoviesList] = React.useState([]);

    React.useEffect(() => {
      api
        .getSaveMovies()
        .then((moviesList) => {
          if (moviesList) {
              setUserMoviesList(moviesList.map((i) => i.movieId));
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

    const getMovies = (search = '') => {
      setIsLoader(true);

        moviesApi
      .getMoviesData()
      .then((movies) => {
          const regular = new RegExp(search, 'i');
          const filtered = movies.filter(movie => {
            const { nameRU, nameEN } = movie;
            return regular.test(nameRU) || regular.test(nameEN);
          })
          // .map(movie => {
          //   movie.isActive = userMoviesList.indexOf(movie.id)>-1;
          //   return movie;
          // }) 
          
          localStorage.setItem(localStorageConst.movies, JSON.stringify(filtered));
          localStorage.setItem(localStorageConst.moviesSearch, inputValue);

          setIsLoader(false);
          setMovies(filtered);
      })
    }

    

    const formSubmitHandler = (e) => {
        e.preventDefault();
        getMovies(inputValue);
    }

    const searchInputChangeHandler = (e) => {
      setInputValue(e.target.value);
  }


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <Search  formSubmitHandler={formSubmitHandler} searchInputChangeHandler={searchInputChangeHandler} inputValue={inputValue}/>
        {isLoader &&  <Preloader />}
        {!isLoader &&  <Cards movies={movies} userMoviesList={userMoviesList} />}
        <Footer />
      </>
    );
  }
  
  export default Movies;