import React from "react";
import './Profile.css';
import Header from "../Header/Header";

function Profile({loggedIn, name, email}) {


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <div className="profile">
            <h2 className="profile__title">{`Привет, ${name}!`}</h2>
            <form className="profile__form">
                
                <label className="profile__label"><span className="profile__span">Имя</span>
                    <input className="profile__input" type="text" value={name}></input>
                </label>

                
                <label className="profile__label"><span className="profile__span">E-mail</span>
                    <input className="profile__input" type="email" value={email}/>
                </label>

            <button className="profile__submit profile__btn">Редактировать</button>
            <button className="profile__logout profile__btn">Выйти из аккаунта</button>
            </form>
        </div>
 
      </>
    );
  }
  
  export default Profile;