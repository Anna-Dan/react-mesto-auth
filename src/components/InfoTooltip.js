import React from "react";
import imageOk from "../images/ok.svg";
import imageError from "../images/error.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen && "popup_opened"}`}
      onClick={props.handleOverlayClose}
    >
      <div className="popup__container popup__container_type_auth">
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <div
          className="popup__auth_image"
          style={{
            backgroundImage: `url(${props.register ? imageOk : imageError})`,
          }}
        />
        <h2 className="popup__title popup__title_type_auth">
          {props.register
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
