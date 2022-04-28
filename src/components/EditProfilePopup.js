import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleUserName(e) {
    setName(e.target.value);
  }

  function handleUserDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      handleOverlayClose={props.handleOverlayClose}     
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          value={name || ""}
          onChange={handleUserName}
          id="name-input"
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя пользователя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          value={description || ""}
          onChange={handleUserDescription}
          id="description-input"
          type="text"
          className=" popup__input popup__input_type_description"
          name="about"
          placeholder="Описание пользователя"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error description-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
