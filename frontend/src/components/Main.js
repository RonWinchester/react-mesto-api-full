import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const userContext = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile wrapper">
        <img
          className="profile__avatar"
          alt="аватар"
          src={userContext.avatar}
        />
        <div className="profile__avatar-image" onClick={props.onEditAvatar} />
        <div className="profile-info">
          <h1 className="profile-info__name">{userContext.name}</h1>
          <button
            className="profile-info__button"
            type="button"
            onClick={props.onEditProfile}
          />
          <p className="profile-info__job">{userContext.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements wrapper">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              onCardLike={props.onCardLike}
              onCardDelete={
                props.onCardDelete
              } /* {() => props.onCardDelete(card)} */
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
