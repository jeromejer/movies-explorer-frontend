import React from "react";
import "./Form.css";
import Logo from '../Logo/Logo';
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <form className="form">

      <div className="form__header">
      <Link to="/" className="form__logo">
            <Logo />
        </Link>
        <h1 className="form__title">{props.title}</h1>
        {props.children}
      </div>

      <div className="form__submit">
        <button className="form__btn">{props.textBtn}</button>
        <div className="form__text">
          <p className="form__subtitle">{props.textSubtitle}</p>
          <Link to={props.to} className="form__link">
            {props.textLink}
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;
