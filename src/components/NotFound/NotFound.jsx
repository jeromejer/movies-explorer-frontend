import React from "react";
import './NotFound.css';
import { useNavigate } from "react-router-dom";

function NotFound() {

  const history = useNavigate();

  




    return (
      <section className="not-found">
            <div className="not-found__block">
                <div className="not-found__text">
                    <h2 className="not-found__title">404</h2>
                    <p className="not-found__subtitle">Страница не найдена</p>
                </div>
            <button className="not-found__btn" onClick={() => history(-1)}>Назад</button>
            </div>
      </section>
    );
  }
  
  export default NotFound;