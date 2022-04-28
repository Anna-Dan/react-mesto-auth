import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //первоначальный рендер страницы
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
      .then((res) => {
        setCards(res[0]);
        setCurrentUser(res[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
           state.map((c) => (c._id === card._id ? newCard : c))
          );   
        })
        .catch((err) => {
          console.log(err);
        });
}

  //удалить карточку
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обновить данные пользователя
  function handleUpdateUser(userInfo) {
    api
      .updateUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обновить аватар
  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //добавить новую карточку
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //открытие попапов
  function handleEditProfileClick() {setIsEditProfilePopupOpen(true);}
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true);}
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true);}
  function handleCardClick(card) {setSelectedCard(card);}

  //закрытие попапов
  function closeAllPopups() {    
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);   
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDelete}
          />
          
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            handleOverlayClose={handleOverlayClose}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            handleOverlayClose={handleOverlayClose}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            handleOverlayClose={handleOverlayClose}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            buttonText="Да"
            onClose={closeAllPopups}            
            handleOverlayClose={handleOverlayClose}
          />

          <ImagePopup
            onClose={closeAllPopups} 
            card={selectedCard} 
            handleOverlayClose={handleOverlayClose}
          />
        </div>
      </div>
      );
    </CurrentUserContext.Provider>
  );
}

export default App;
