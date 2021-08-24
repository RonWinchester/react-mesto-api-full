import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick,  onCardLike, onCardDelete}) {

    

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `element__button-heart ${isLiked && 'element__button-heart_active'}`;

    return (
        <li className="element">
            {isOwn&&<button className="element__button-remove" type="button" onClick={handleDeleteClick}></button>}
            <img alt={card.name} className="element__image" src={card.link} onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__heart-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <div className="element__like-number">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card