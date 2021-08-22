import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import vectorLogo from '../images/vector-logo.svg';
import '../index.css';

function Header({ loggedIn, email, logOut }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    function handleMenuOpen() {
        setIsMenuOpen(!isMenuOpen)
    }

    const location = useLocation()
    let link = ''
    let name = ''

    if (location.pathname === '/sign-in') {
        link = '/sign-up'
        name = 'Регистрация'
    } else if (location.pathname === '/sign-up') {
        link = '/sign-in'
        name = 'Войти'
    }

    return (
        <>
            <div className={`menu ${isMenuOpen && loggedIn ? 'menu_active' : ''}`}>
                <span className='email email_center'>{email}</span>
                <button className='header__button' onClick={logOut}>Выход</button>
            </div>
            <header className="header alignment">
                <Link to='/'>
                    <img alt="логотип" className="logo" src={vectorLogo} />
                </Link>

                {loggedIn ? (
                    <>
                        <span className='email email_remove'>{email}</span>
                        <button className='header__button header__button_remove' onClick={logOut}>Выход</button>
                        <button className={`header__menu-button ${isMenuOpen ? 'header__menu-button_close' : ''}`} onClick={handleMenuOpen}></button>
                    </>) :
                    (<Link className='link' to={link}>{name}</Link>)}

            </header>
        </>
    )
}

export default Header