import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [pictureName, setPictureName] = React.useState("");
  const [pictureLink, setPictureLink] = React.useState("");

  React.useEffect(() => {
    setPictureName("");
    setPictureLink("");
  }, [props.isOpen]);

  function handlePictureName(e) {
    setPictureName(e.target.value);
  }

  function handlePictureLink(e) {
    setPictureLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: pictureName,
      link: pictureLink,
    });
  }
 

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleOverlayClose={props.handleOverlayClose}
      onSubmit={handleSubmit}      
    >
      <div className="popup__input-container">
        <input
          value={pictureName || ""}
          onChange={handlePictureName}
          id="place-input"
          type="text"
          className="popup__input popup__input_type_place"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          value={pictureLink || ""}
          onChange={handlePictureLink}
          id="url-input"
          type="url"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
