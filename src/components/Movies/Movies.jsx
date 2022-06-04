import React, { useEffect, useState } from "react";
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

  // initial data
  let initialMovies = [];
  try {
    initialMovies = JSON.parse(localStorage.getItem(localStorageConst.movies)) || [];
  }
  catch (e) { }
  const initialSearch = localStorage.getItem(localStorageConst.moviesSearch) || '';
  const initialCheckbox = parseInt(localStorage.getItem(localStorageConst.moviesCheckbox));
  const initialCheckboxSavedMovies = parseInt(localStorage.getItem(localStorageConst.moviesCheckboxSavedMovies));

  // movies
  const [inputValue, setInputValue] = useState(initialSearch);
  const [movies, setMovies] = useState(initialMovies);
  const [isShortFilms, setIsShortFilms] = useState(initialCheckbox);
  const [isFirstPageLoad, setIsFirstPageLoad] = useState(false);
  const [inputError, setInputError] = useState('');

  // saved movies
  const [userMoviesList, setUserMoviesList] = useState([]);
  const [userMoviesListForView, setUserMoviesListForView] = useState([]);
  const [inputValueSavedMovies, setInputValueSavedMovies] = useState('');
  const [isShortFilmsSavedMovies, setIsShortFilmsSavedMovies] = useState(initialCheckboxSavedMovies);
  const [inputErrorSavedMovies, setInputErrorSavedMovies] = useState('');

  // state
  const [errText, serErrText] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  // location
  const location = useLocation();
  const isMoviesLocation = location.pathname === "/movies";

  // effects
  useEffect(() => {
    getSavedMovies();
  }, []);

  useEffect(() => {
    setMovies(movies.map(setActiveState));
  }, [userMoviesList]);

  useEffect(() => {
    if (!isFirstPageLoad) { return }
    getMovies(inputValue);
  }, [isShortFilms]);

  useEffect(() => {
    getSavedMovies(inputValueSavedMovies);
  }, [isShortFilmsSavedMovies]);

  // helpers
  const filterMovieCB = (movies, search) => {
    const regular = new RegExp(search, 'i');
    return movies.filter(movie => {
      const { nameRU, nameEN } = movie;
      return regular.test(nameRU) || regular.test(nameEN);
    });
  };

  const filterMovieByDurationCB = (movies, isShort) => {
    if (isShort) { return movies }
    return movies.filter(movie => {
      return movie.duration <= 40;
    });
  };

  const setActiveState = movieFromList => {
    const findedMovie = userMoviesList.find(movie => movie.movieId === movieFromList.id);
    movieFromList.isActive = findedMovie && true;
    movieFromList._id = findedMovie?._id;
    return movieFromList;
  };

  // API
  //получение списка фильмов из поиска по апи
  const getMovies = (search = '') => {

    setIsFirstPageLoad(true);

    return moviesApi
      .getMoviesData()
      .then((movies) => filterMovieCB(movies, search))
      .then((movies) => filterMovieByDurationCB(movies, isShortFilms))
      .then(filtered => {
        localStorage.setItem(localStorageConst.movies, JSON.stringify(filtered));
        localStorage.setItem(localStorageConst.moviesSearch, inputValue);
        setMovies(filtered.map(setActiveState));
        setInputError('');
      })
      .catch((err) => {
        console.log(err);
        serErrText(errorText);
      })

  }

  //получение фильма из поиска по сохраненным фильмам
  const getSavedMovies = () => {

    return api
      .getSaveMovies()
      .then(filtered => {
        setUserMoviesList(filtered);
        setInputErrorSavedMovies('');
        setUserMoviesListForView(filterSavedMovies(filtered, inputValueSavedMovies, isShortFilmsSavedMovies));
      })
      .catch((err) => {
        console.log(err);
        serErrText(errorText);
      })

  }

  const filterSavedMovies = (movies, search, isShort)=>{
    movies = filterMovieCB(movies, search);
    return filterMovieByDurationCB(movies, isShort);
  }

  //сохранение фильма
  const addMovie = (movie) => {
    if (movie.isActive) {
      movie._id && removeMovie(movie)
    }
    else {
      api
        .addMovie(movie)
        .then(() => {
          getSavedMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // удаление фильма
  const removeMovie = (movie) => {
    api
      .deleteMovie(movie._id)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handlers
  const formSubmitHandlerMovies = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      setInputError('Введите ключевое слово');
      return
    }

    setIsLoader(true);
    getMovies(inputValue)
    .finally(() => setIsLoader(false));
  }

  const formSubmitHandlerSavedMovies = (e) => {
    e.preventDefault();
    if (inputValueSavedMovies === '') {
      setInputErrorSavedMovies('Введите ключевое слово');
      return
    }

    setIsLoader(true);
    getSavedMovies(inputValueSavedMovies)
    .finally(() => setIsLoader(false));
  }

  const searchInputChangeHandler = (e) => {
    setInputValue(e.target.value);
  }

  const searchInputChangeHandlerSavedMovies = (e) => {
    setInputValueSavedMovies(e.target.value);
  }

  const onCheckboxChangeMovies = () => {
    const checked = !isShortFilms;
    if (inputValue) { setIsFirstPageLoad(true) }
    setIsShortFilms(checked);
    localStorage.setItem(localStorageConst.moviesCheckbox, checked * 1);
  };

  const onCheckboxChangeSavedMovies = () => {
    const checked = !isShortFilmsSavedMovies;
    setIsShortFilmsSavedMovies(checked);
    localStorage.setItem(localStorageConst.moviesCheckboxSavedMovies, checked * 1);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isMoviesLocation ?
        <Search
          formSubmitHandler={formSubmitHandlerMovies}
          inputError={inputError}
          searchInputChangeHandler={searchInputChangeHandler}
          inputValue={inputValue}>
          <Checkbox checked={isShortFilms} onChange={onCheckboxChangeMovies} />
        </Search> :

        <Search
          formSubmitHandler={formSubmitHandlerSavedMovies}
          inputError={inputErrorSavedMovies}
          searchInputChangeHandler={searchInputChangeHandlerSavedMovies}
          inputValue={inputValueSavedMovies}>
          <Checkbox checked={isShortFilmsSavedMovies} onChange={onCheckboxChangeSavedMovies} />
        </Search>
      }

      {isLoader && <Preloader />}

      { !isLoader && (isMoviesLocation ?
        <Cards movies={movies} clickHandler={addMovie} errText={errText} render={isFirstPageLoad} />
        : <Cards movies={userMoviesListForView} clickHandler={removeMovie} errText={errText} render={isFirstPageLoad} />)
      }
      <Footer />
    </>
  );
}

export default Movies;