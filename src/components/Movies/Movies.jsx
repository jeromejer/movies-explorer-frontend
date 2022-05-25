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


function Movies({ loggedIn }) {

  let initialMovies = [];
  try {
    initialMovies = JSON.parse(localStorage.getItem(localStorageConst.movies)) || [];
  }
  catch (e) { }

  const initialSearch = localStorage.getItem(localStorageConst.moviesSearch) || '';

  const location = useLocation();

  console.log('render list')

  const [movies, setMovies] = useState(initialMovies);
  const [userMoviesList, setUserMoviesList] = React.useState([]);

  const [inputValue, setInputValue] = useState(initialSearch);
  const [isLoader, setIsLoader] = React.useState(false);


  //получение сохраненных фильмов
  const getSavedUserMovies = () => {
    return api
      .getSaveMovies()
      .then((moviesList) => {
        if (moviesList) {
          setUserMoviesList(moviesList);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  React.useEffect(() => {
    getSavedUserMovies();
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setInputValue('')
    } else {
      setInputValue(initialSearch)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  React.useEffect(() => {
    setMovies(movies.map(setActiveState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMoviesList]);

  //получение списка фильмов из поиска бестфильм
  const getMovies = (search = '') => {
    setIsLoader(true);

    moviesApi
      .getMoviesData()
      .then((movies) => {
        const regular = new RegExp(search, 'i');
        const filtered = movies.filter(movie => {
          const { nameRU, nameEN } = movie;
          return regular.test(nameRU) || regular.test(nameEN);
        });

        localStorage.setItem(localStorageConst.movies, JSON.stringify(filtered));
        localStorage.setItem(localStorageConst.moviesSearch, inputValue);

        setMovies(filtered.map(setActiveState));
        setIsLoader(false);

        console.log(filtered)
        console.log(movies)
      })
  }

  const setActiveState = movieFromList => {
    const findedMovie = userMoviesList.find(movie => movie.movieId === movieFromList.id);
    movieFromList.isActive = findedMovie && true;
    movieFromList._id = findedMovie?._id;
    return movieFromList;
  };

  //сохранение фильма
  function addMovie(movie) {
    if (movie.isActive) {
      movie._id && removeMovie(movie)
    }
    else {
      api
        .addMovie(movie)
        .then(() => {
          getSavedUserMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // удаление фильма
  function removeMovie(movie) {
    console.log(movie, 'delete')
    api
      .deleteMovie(movie._id)
      .then(() => {
        getSavedUserMovies();
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Header loggedIn={loggedIn} />
      <Search formSubmitHandler={formSubmitHandler} searchInputChangeHandler={searchInputChangeHandler} inputValue={inputValue} />
      {isLoader && <Preloader />}

      {location.pathname === "/movies" ?
        <Cards movies={movies} clickHandler={addMovie} />
        : <Cards movies={userMoviesList} clickHandler={removeMovie} />
      }

      <Footer />
    </>
  );
}

export default Movies;

