import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import api from "../utils/Api";
import * as apiAuth from "../utils/apiAuth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(false);

  //лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLike(card._id, isLiked)
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
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipOpen(boolean) {
    setRegister(boolean);
    setIsInfoTooltipOpen(true);
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  /* Авторизация */
  function handleLogin() {
    setLoggedIn(true);
  }

  function handleRegisterSubmit(password, email) {
    apiAuth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          handleInfoTooltipOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err.message);
      });
  }

  function handleLoginSubmit(password, email) {
    apiAuth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      apiAuth
        .getContent(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    if (setLoggedIn) {
      Promise.all([api.getInitialCards(), api.getProfileInfo()])
        .then((res) => {
          setCards(res[0]);
          setCurrentUser(res[1]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function onSingOut() {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header handleLogOut={onSingOut} email={email} />
          <Switch>
            <Route path="/sign-up">
              <Register handleRegisterSubmit={handleRegisterSubmit} />
            </Route>

            <Route path="/sign-in">
              <Login handleLoginSubmit={handleLoginSubmit} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDelete}
            ></ProtectedRoute>
          </Switch>

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
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            handleOverlayClose={handleOverlayClose}
            register={register}
          />
        </div>
      </div>
      );
    </CurrentUserContext.Provider>
  );
}

export default App;
