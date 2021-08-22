import React from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

function Register({ sendRegistrationData }) {

    const [emailRegister, setEmailRegister] = React.useState('')
    const [passwordRegister, setPasswordRegister] = React.useState('')

    function handleEmail(e) {
        setEmailRegister(e.target.value);

    }

    function handlePassword(e) {
        setPasswordRegister(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendRegistrationData({
            email: emailRegister,
            password: passwordRegister
        });
    }

    return (
        <div className='wrapper'>
            <form className='form form_sign-in' onSubmit={handleSubmit}>
                <h2 className='form__name'>Регистрация</h2>
                <fieldset className="form__fildset">
                    <input className='form__input form__input_sign-in' value={emailRegister} onChange={handleEmail} type="email" placeholder="Email" name='email' id="email"></input>
                    <input className='form__input form__input_sign-in' value={passwordRegister} onChange={handlePassword} type="password" placeholder="Пароль"></input>
                    <button className="form__button form__button_sign-in" type="submit">Зарегистрироваться</button>
                </fieldset>
                <p className='form__subname'>Уже зарегистрированы? <Link className='link link_small-size' to='/sign-in'>Войти</Link></p>
            </form>
        </div>
    )
}

export default Register