import React from "react";
import './Login.css';
import Auth from '../Auth/Auth';
import Form from '../Form/Form';
import ValidationForm from '../../utils/validationForm'




function Login({onLogin, loginError}) {

  const validation = ValidationForm();
  const { values, handleChange, errors, isValid, onFocus, isFocused } = validation;
  const { email, password } = values;


  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({email, password});
    validation.resetForm();
  };

  const inputClassName = (error)=>{
    return `form__input ${error ? 'form__input_active' : ''}`;
  }

  const errorClassName = (error)=>{
    return `form__error ${error ? 'form__error_active' : ''}`;
  }

  console.log('loginError', loginError)

  return (
    <Auth >
        <Form onSubmit={handleSubmit} loginError={loginError} isValid={isValid} validation={validation}>

            <p className="form__input-title">E-mail</p>

            <input 
              type="email" 
              className={inputClassName(errors.email && !isFocused.email)} 
              name="email" 
              value={values.email}
              onChange={handleChange} 
              onFocus={onFocus}
              required
            />

            <span className={errorClassName(errors.email && !isFocused.email)} id="email">{errors.email}</span>

            <p className="form__input-title">Пароль</p>

            <input 
            type="password" 
            className={inputClassName(errors.password && !isFocused.password)} 
            name="password" 
            minLength="8"  
            value={values.password} 
            onChange={handleChange} 
            onFocus={onFocus}
            required/>

            <span className={errorClassName(errors.password && !isFocused.password)} id="password">{errors.password}</span>
        </Form>
        
    </Auth>
  );
}

export default Login;
