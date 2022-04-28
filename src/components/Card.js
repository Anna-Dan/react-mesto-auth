import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete-button ${isOwn ? "" : "elements__delete-button_hidden"}`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${isLiked ? "elements__like-button_active" : ""}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDeleteClick(props.card);
  }

  return (
    <li className="elements__card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        title="Удалить"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="elements__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__info-container">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Нравится"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
