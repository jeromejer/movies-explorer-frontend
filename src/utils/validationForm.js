/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import validation from './validation';

function validationForm () {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);
    const [isFocused, setIsFocused] = React.useState({})

    const onFocus = (e) => {
        let focus = {};
        focus[e.target.name]=true;
        setIsFocused(focus);
    }

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const error = validation(name, value);

        setValues({ ...values, [name]: value});

        setErrors(validation(name, value));

        if(Object.keys(error).length === 0){
            setIsValid(target.closest('form').checkValidity())
        }
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
      );

    return {values, handleChange, setValues, errors, isValid, onFocus, isFocused, resetForm};
}

export default validationForm;