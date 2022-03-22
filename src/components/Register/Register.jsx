import React from "react";
import Auth from '../Auth/Auth';
import Form from '../Form/Form';




function Register() {


  return (
    <Auth>
        <Form textBtn="Зарегистрироваться" textSubtitle="Уже зарегистрированы?" textLink="Войти" to="/signin" title="Добро пожаловать!">
            <p className="form__input-title">Имя</p>
            <input type="text" className="form__input" name="name_user" required/>
            <span className="form__error" id="name_user-error">Что-то пошло не так...</span>

            <p className="form__input-title">E-mail</p>
            <input type="email" className="form__input" name="email_user" required/>
            <span className="form__error" id="email_user-error">Что-то пошло не так...</span>

            <p className="form__input-title">Пароль</p>
            <input type="password" className="form__input form__input_active" name="password_user" minLength="8" required/>
            <span className="form__error form__error_active" id="password_user-error">Что-то пошло не так...</span>
        </Form>    
    </Auth>
  );
}

export default Register;
