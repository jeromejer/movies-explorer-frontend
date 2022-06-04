import React from "react";
import './Profile.css';
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({loggedIn, handleSignOut, onUpdateUser, succesUpdate, setSuccesUpdate}) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [originData, setOriginData] = React.useState(false);
  const [notSuccesUpdate, setNotSuccesUpdate] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    const name = e.target.value;
    setNotSuccesUpdate(name === originData.name && email === originData.email);
    setName(name);
  }

  function handleEmailChange(e) {
    const email = e.target.value;
    setNotSuccesUpdate(email === originData.email && name === originData.name);
    setEmail(email);
  }

  React.useEffect(() => {
    if (currentUser.name) {
      setOriginData({name: currentUser.name, email: currentUser.email})
    }
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
    setNotSuccesUpdate(true);
  }
  
    React.useEffect(() => {
      return () => {
        setSuccesUpdate(false)
      }
    }, [])

  


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <div className="profile">
            <h2 className="profile__title">{`Привет, ${name}!`}</h2>
            
            <form className="profile__form" onSubmit={handleSubmit}>
                
                <label className="profile__label"><span className="profile__span">Имя</span>
                    <input className="profile__input" type="text" name="name" value={name} onChange={handleNameChange}></input>
                </label>

                
                <label className="profile__label"><span className="profile__span">E-mail</span>
                    <input className="profile__input" type="email" value={email} onChange={handleEmailChange}/>
                </label>


                <p className={succesUpdate ? "profile__title" : "profile__succes"}>Данные успешно изменены!</p>
            <button className="profile__submit profile__btn" disabled={notSuccesUpdate}>Редактировать</button>
            <button className="profile__logout profile__btn" onClick={handleSignOut}>Выйти из аккаунта</button>
            </form>
        </div>
 
      </>
    );
  }
  
  export default Profile;