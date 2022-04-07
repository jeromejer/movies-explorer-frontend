import React from "react";
import "./Form.css";
import Logo from '../Logo/Logo';
import { Link, useLocation } from "react-router-dom";

function Form({children, onSubmit}) {

  const location = useLocation()
  const textBtn = `${location.pathname === "/signin" ? "Войти" : "Регистрация"}`;
  const text = `${location.pathname === "/signin" ? "Регистрация" : "Войти"}`;
  const subText = `${location.pathname === "/signin" ? "Еще не зарегистрированы?" : "Уже зарегистрированы?"}`;
  const title = `${location.pathname === "/signin" ? "Рады видеть!" : "Добро пожаловать!"}`;
  const linkRoute = `${location.pathname === "/signin" ? "/signup" : "/signin"}`;

  return (
    <form className="form" onSubmit={onSubmit}>

      <div className="form__header">
      <Link to="/" className="form__logo">
            <Logo />
        </Link>
        <h1 className="form__title">{title}</h1>
        {children}
      </div>

      <div className="form__submit">
        <button className="form__btn">{textBtn}</button>
        <div className="form__text">
          <p className="form__subtitle">{subText}</p>
          <Link to={linkRoute} className="form__link">
            {text}
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;
