import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__photo-edit"
          aria-label="Обновить аватар"
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__photo"
            src={currentUser.avatar}
            alt="аватар профиля"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              title="Редактировать профиль"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить фотографию"
          aria-label="Добавить фотографию"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDeleteClick={props.onCardDeleteClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
