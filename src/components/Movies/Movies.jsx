import React, { useState } from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Checkbox from "../Checkbox/Checkbox";
import Cards from "../Cards/Cards";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import { localStorageConst, errorText } from "../../constants/const";
import api from "../../utils/MainApi";
import { useLocation } from "react-router-dom";


function Movies({ loggedIn }) {

  let initialMovies = [];
  try {
    initialMovies = JSON.parse(localStorage.getItem(localStorageConst.movies)) || [];
  }
  catch (e) { }

  const initialSearch = localStorage.getItem(localStorageConst.moviesSearch) || '';

  const initialCheckbox = parseInt(localStorage.getItem(localStorageConst.moviesCheckbox));

  const location = useLocation();

  const [movies, setMovies] = useState(initialMovies);
  const [userMoviesList, setUserMoviesList] = React.useState([]);

  const [inputValue, setInputValue] = useState(initialSearch);
  const [inputError, setInputError] = useState('');
  const [isLoader, setIsLoader] = React.useState(false);
  const [isShortFilms, setIsShortFilms] = React.useState(initialCheckbox);
  const [errText, serErrText] = React.useState('');

  //получение сохраненных фильмов
  const getSavedUserMovies = () => {


    return api
      .getSaveMovies()
      .then((moviesList) => {
        if (moviesList) {
          setUserMoviesList(moviesList);
        }
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

  //получение списка фильмов из поиска по апи
  const getMovies = (search = '') => {

    setIsLoader(true);

    moviesApi
      .getMoviesData()
      .then((movies) => {
        if (!Array.isArray(movies)) {
          movies = [];
        }

        const regular = new RegExp(search, 'i');
        const filtered = movies.filter(movie => {
          console.log(isShortFilms, movie.duration)
          if (!isShortFilms && movie.duration > 40) {
            return false;
          }
          const { nameRU, nameEN } = movie;
          return regular.test(nameRU) || regular.test(nameEN);
        });

        localStorage.setItem(localStorageConst.movies, JSON.stringify(filtered));
        localStorage.setItem(localStorageConst.moviesSearch, inputValue);

        setMovies(filtered.map(setActiveState));
        setIsLoader(false);
        setInputError('');

      })
      .catch((err) => {
        console.log(err);
        serErrText(errorText);
      })
      .finally(() => {
        setIsLoader(false);
      })
  }

  //получение фильма из поиска по сохраненным фильмам
  const getSavedMovies = (search = '') => {

    setIsLoader(true);

    api
      .getSaveMovies()
      .then((movies) => {
        const regular = new RegExp(search, 'i');
        const filtered = movies.filter(movie => {
          if (!isShortFilms && movie.duration > 40) {
            return false;
          }
          const { nameRU, nameEN } = movie;
          return regular.test(nameRU) || regular.test(nameEN);
        });


        setUserMoviesList(filtered);
      })
      .catch((err) => {
        console.log(err);
        serErrText(errorText);
      })
      .finally(() => {
        setIsLoader(false);
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
    api
      .deleteMovie(movie._id)
      .then(() => {
        getSavedUserMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  React.useEffect(() => {
    if (location.pathname === '/movies') {
      getMovies(inputValue);
    } else {
      getSavedMovies(inputValue);
      console.log()
    }
  }, [isShortFilms])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      setInputError('Введите ключевое слово');
      return
    }
    if (location.pathname === '/movies') {

      getMovies(inputValue);
    } else {

      getSavedMovies(inputValue)
    }
  }

  const searchInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  }

  const onCheckboxChange = () => {
    const checked = !isShortFilms;
    setIsShortFilms(checked);
    localStorage.setItem(localStorageConst.moviesCheckbox, checked * 1);

  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Search
        formSubmitHandler={formSubmitHandler}
        inputError={inputError}
        searchInputChangeHandler={searchInputChangeHandler}
        inputValue={inputValue}>
        <Checkbox checked={isShortFilms} onChange={onCheckboxChange} />
      </Search>
      {isLoader && <Preloader />}

      {location.pathname === "/movies" ?
        <Cards movies={movies} clickHandler={addMovie} errText={errText} />
        : <Cards movies={userMoviesList} clickHandler={removeMovie} errText={errText} />
      }

      <Footer />
    </>
  );
}

export default Movies;