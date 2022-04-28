function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen && "popup_opened"}`}
      onClick={props.handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть"
          id={`button_close_${props.name}`}
          onClick={props.onClose}
        ></button>

        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h2>
        <form
          className="popup__form"
          name={props.name}
          id={`form_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__fieldset">
            {props.children}
            <button className="popup__submit" type="submit" title="Сохранить">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
