import React from "react";
import Auth from '../Auth/Auth';
import Form from '../Form/Form';
import ValidationForm from '../../utils/validationForm'



function Register({onRegister, registerError}) {
  const validation = ValidationForm();
  const { values, handleChange, errors, isValid, onFocus, isFocused } = validation;
  const { name, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({name, email, password});
    validation.resetForm();
  };

  const inputClassName = (error)=>{
    return `form__input ${error ? 'form__input_active' : ''}`;
  }

  const errorClassName = (error)=>{
    return `form__error ${error ? 'form__error_active' : ''}`;
  }

  return (
    <Auth>
        <Form onSubmit={handleSubmit} isValid={isValid} validation={validation} registerError={registerError}>
            <p className="form__input-title">Имя</p>
            <input 
              type="text" 
              className={inputClassName(errors.name && !isFocused.name)} 
              name="name" 
              value={values.name} 
              onChange={handleChange}
              onFocus={onFocus}
              required/>

            <span 
              className={errorClassName(errors.name && !isFocused.name)} 
              id="name">
              {errors.name}
            </span>

            <p className="form__input-title">E-mail</p>
            <input  
              type="email" 
              className={inputClassName(errors.email && !isFocused.email)}  
              name="email" 
              value={values.email} 
              onChange={handleChange} 
              onFocus={onFocus}
              required/>

            <span 
              className={errorClassName(errors.email && !isFocused.email)}
              id="email">
              {errors.email}
            </span>

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
            <span 
              className={errorClassName(errors.password && !isFocused.password)}
              id="password">
              {errors.password}
            </span>
        </Form>    
    </Auth>
  );
}

export default Register;
