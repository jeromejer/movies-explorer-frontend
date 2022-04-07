import React from "react";
import './Login.css';
import Auth from '../Auth/Auth';
import Form from '../Form/Form';




function Login({onLogin}) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


    function handleSubmit(e) {
        e.preventDefault();

        onLogin({ password, email })

    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

  return (
    <Auth >
        <Form onSubmit={handleSubmit}>

            <p className="form__input-title">E-mail</p>
            <input type="email" className="form__input" name="email_user" 
            value={email} onChange={handleChangeEmail} required/>
            <span className="form__error" id="email_user-error">Что-то пошло не так...</span>

            <p className="form__input-title">Пароль</p>
            <input type="password" className="form__input form__input_active" name="password_user" minLength="8"  
            value={password} onChange={handleChangePassword} required/>
            <span className="form__error form__error_active" id="password_user-error">Что-то пошло не так...</span>
        </Form>
        
    </Auth>
  );
}

export default Login;
