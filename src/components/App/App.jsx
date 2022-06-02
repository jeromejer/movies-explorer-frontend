import './App.css';
import React from "react";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import api from "../../utils/MainApi";
import { localStorageConst } from "../../constants/const";


function App() {

  const [afterLoginCheck, setAfterLoginCheck] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [loginError, setLoginError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  const [succesUpdate, setSuccesUpdate] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const jwt = localStorage.getItem(localStorageConst.jwt);
  const nav = useNavigate();


  //описание авторизации
  function onLogin({ email, password }) {
    return api
      .signin({ email, password })
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem(localStorageConst.jwt, data.token);
          localStorage.setItem(localStorageConst.email, email);
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
          nav("/movies");
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
        })
        .finally(() => {
          setAfterLoginCheck(true)
        })
    }
    else { setAfterLoginCheck(true) }
  }, []);

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
        })
    }
  }, [loggedIn]);

  //изменение данных профиля
  function handleUpdateUser({ name, email }) {

    api
      .updateUserData({ name, email })
      .then((data) => {
          setCurrentUser(data);
          setSuccesUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    Object.keys(localStorageConst).forEach(key => {
      localStorage.removeItem(key)
    });
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

          {afterLoginCheck && <Route
            path="/movies"
            element={loggedIn ?
              <Movies loggedIn={loggedIn} /> : <Navigate to="/" />
            }
          />}

          {afterLoginCheck && <Route
            path="/saved-movies"
            element={loggedIn ?
              <Movies loggedIn={loggedIn} /> : <Navigate to="/" />
            }
          />
          }

          <Route
            path="/signup"
            element={
              <Register onRegister={onRegister} registerError={registerError} />
            }
          />
          <Route
            path="/signin"
            element={
              <Login onLogin={onLogin} loginError={loginError} />
            }
          />

          {afterLoginCheck && <Route
            path="/profile"
            element={loggedIn ?
              <Profile
                loggedIn={loggedIn}
                email={email}
                onUpdateUser={handleUpdateUser}
                handleSignOut={handleSignOut} 
                succesUpdate={succesUpdate}
                setSuccesUpdate={setSuccesUpdate}/> : <Navigate to="/" />
            }
          />
          }

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
