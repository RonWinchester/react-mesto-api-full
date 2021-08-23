import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import defaultAvatar from "../images/oko.jpg";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: "Я вижу тебя",
    avatar: defaultAvatar,
    about: "Маленький хоббит",
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAuthSuccess, setisAuthSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  //Подтягиваем данные пользователя и карточки
  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    checkToken();
    Promise.all([api.getUserInformation(), api.getCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке данных профиля и карточек: ${err}`);
      });
  }, [loggedIn]);


  //Обновляем данные пользователя
  function handleUpdateUser(data) {
    api
      .patchUserInformation(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при отправке данных профиля : ${err}`);
      });
  }

  //Обновляем аватар пользователя
  function handleUpdateAvatar(data) {
    api
      .pathcAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при отправке аватара профиля : ${err}`);
      });
  }
  //Ниже: открываем и закрываем попапы
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({ name: "", link: "" });
  }
  //Закрытие попапа по Esc и овеврлею
  /*   React.useEffect(() => {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
  
      function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
          closeAllPopups();
        }
      }
  
      if (isInfoTooltipOpen || isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard.name !== '' || selectedCard.link !== '') {
        document.addEventListener('keyup', handleEscClose);
        document.addEventListener('click', handleOverlayClose);
      }
      return () => {
        document.removeEventListener('keyup', handleEscClose);
        document.removeEventListener('click', handleOverlayClose);
      }
    }, [isInfoTooltipOpen, isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, selectedCard]); */

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (
      isInfoTooltipOpen ||
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard.name !== "" ||
      selectedCard.link !== ""
    ) {
      document.addEventListener("keyup", handleEscClose);
    }
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [
    isInfoTooltipOpen,
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  //Переключаем лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка при переключении лайка : ${err}`);
      });
  }

  //Удаялем карточки
  function handleCardDelete(card) {
    api
      .deleteCards(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки : ${err}`);
      });
  }

  //Добавляем карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке карточек: ${err}`);
      });
  }

  //Регистрация пользователя
  function handleRegistration({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        history.push("/sign-in");
        setisAuthSuccess(true);
        setInfoTooltip(true);
      })
      .catch((err) => {
        setisAuthSuccess(false);
        setInfoTooltip(true);
        console.log(`Ошибка при регистрации: ${err}`);
      });
  }

  //Авторизация
  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
          //localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        setisAuthSuccess(false);
        setInfoTooltip(true);
        console.log(`Ошибка авторизации: ${err}`);
      });
  }

  function checkToken() {
    auth
      .getContent()
      .then((res) => {
        setEmail(res.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        localStorage.removeItem("token");
        history.push("/sign-in");
        console.log(err);
      });
  }

  //Проверка токена
  /*   function checkToken() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("token");
          history.push("/sign-in");
          console.log(err);
        });
    }
  } */

  //Выход из профиля
  function logOut() {
/*     localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in"); */

    auth
      .logout()
      .then(() => {
        //localStorage.removeItem("token");
        setLoggedIn(false);
        //setEmail('');
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}!`);
      });
  }

  /*  //Выход из профиля
  function logOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  } */

/*   React.useEffect(() => {
    checkToken();
  }, [loggedIn]); */

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} logOut={logOut} />

        <Switch>
          <Route path="/sign-in">
            <Login sendLoginData={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register sendRegistrationData={handleRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          ></ProtectedRoute>
        </Switch>

        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />
        <PopupWithForm
          popupId="deletionCardForm"
          buttonText="Да"
          formName="deletionCardForm"
          formId="CardRemoveForm"
          title="Вы уверены?"
          handleOverlayClose={handleOverlayClose}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isAuthSuccess={isAuthSuccess}
          registrationOk={"Вы успешно зарегистрировались!"}
          registrationFalse={"Что-то пошло не так! Попробуйте ещё раз."}
          handleOverlayClose={handleOverlayClose}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
