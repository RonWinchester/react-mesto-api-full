import React from 'react'
import '../index.css';

function Login({ sendLoginData }) {

    const [emailLogin, setEmailLogin] = React.useState('')
    const [passwordLogin, setPasswordLogin] = React.useState('')

    function handleEmail(e) {
        setEmailLogin(e.target.value);

    }

    function handlePassword(e) {
        setPasswordLogin(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendLoginData({
            email: emailLogin,
            password: passwordLogin
        });
    }


    return (
        <div className='wrapper'>
            <form className='form form_sign-in' onSubmit={handleSubmit}>
                <h2 className='form__name'>Вход</h2>
                <fieldset className="form__fildset">
                    <input className='form__input form__input_sign-in' value={emailLogin} onChange={handleEmail} type="email" placeholder="Email" name='email' id="email"></input>
                    <input className='form__input form__input_sign-in' value={passwordLogin} onChange={handlePassword} type="password" placeholder="Пароль"></input>
                    <button className="form__button form__button_sign-in" type="submit">Войти</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login