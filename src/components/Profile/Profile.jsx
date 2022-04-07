import React from "react";
import './Profile.css';
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({loggedIn, handleSignOut, onUpdateUser}) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
  }


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <div className="profile">
            <h2 className="profile__title">{`Привет, ${name}!`}</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                
                <label className="profile__label"><span className="profile__span">Имя</span>
                    <input className="profile__input" type="text" value={name} onChange={handleNameChange}></input>
                </label>

                
                <label className="profile__label"><span className="profile__span">E-mail</span>
                    <input className="profile__input" type="email" value={email} onChange={handleEmailChange}/>
                </label>

            <button className="profile__submit profile__btn">Редактировать</button>
            <button className="profile__logout profile__btn" onClick={handleSignOut}>Выйти из аккаунта</button>
            </form>
        </div>
 
      </>
    );
  }
  
  export default Profile;