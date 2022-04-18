import './App.css';
import React from "react";
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loginError, setLoginError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const jwt = localStorage.getItem("jwt");
  const nav = useNavigate();

  //описание авторизации
  function onLogin(email, password) {
   return api
      .signin(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('email', email);
          setLoggedIn(true);
          setEmail(email);
          nav("/movies"); 
        }
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
      })
  }


  //описание регистрации
  function onRegister({ name, password, email }) {
    return api
      .signup({ name, password, email })
      .then((data) => {
        if (data.data.email) {
          nav("/signin");
        }
      })
      .catch((err) => {
        setRegisterError(true)
        console.log(err);
      });
  }

  //проверка токена
  React.useEffect(() => {
    if (jwt) {
      api
        .checkToken(jwt)
        .then((data) => {
          if (data && data.email) {
            setEmail(data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt]);

  //получение данных профиля
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //изменение данных профиля
  function handleUpdateUser({ name, email }) {
    api
      .updateUserData({ name, email })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    setEmail("");
    nav("/");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main loggedIn={loggedIn} />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies loggedIn={loggedIn} />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies loggedIn={loggedIn} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={onRegister} registerError={registerError}/>
            }
          />
          <Route
            path="/signin"
            element={
              <Login onLogin={onLogin} loginError={loginError}/>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                loggedIn={loggedIn}
                email={email}
                onUpdateUser={handleUpdateUser}
                handleSignOut={handleSignOut} />
            }
          />
          <Route
            path="/not-found"
            element={
              <NotFound />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
