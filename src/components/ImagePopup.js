function ImagePopup({card, onClose, handleOverlayClose}) {
    return (
      <div
        className={`popup popup_type_zoom ${card.link ? 'popup_opened' : ''}`}
        id="popup_type_zoom"
        onClick={handleOverlayClose}
      >
        <div className="popup__zoom-container">
          <button
            className="popup__close-button"
            type="button"
            title="Закрыть окно"
            aria-label="Закрыть"
            id="button_close_image"
            onClick={onClose}
          ></button>
          <figure className="popup__figure">
            <img
              className="popup__figure-image"
              src={card.link}
              alt={card.name}
            />
            <figcaption className="popup__figcaption">
              {card.name}
            </figcaption>
          </figure>
        </div>
      </div>
    );
  }
  
  export default ImagePopup;
  