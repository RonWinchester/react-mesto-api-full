export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__input-error_active',
  inputErrorClass: 'form__input_type_error'
}

export const profileButton = document.querySelector('.profile-info__button');
export const addElementButton = document.querySelector('.profile__add-button');

export const popupEditForm = document.querySelector('#profileEditForm');
export const elementAddForm = document.querySelector('#elementAddForm');
export const imagePopup = document.querySelector('#imagePopup');

export const avatarProfile = document.querySelector('#avatarImageEditForm');
export const editAvatarImage = document.querySelector('.profile__avatar-image')
export const removeCardForm = document.querySelector('#CardRemoveForm')

export const formProfile = document.querySelector('#profileForm');
export const nameInput = document.querySelector('#nameInput');
export const jobInput = document.querySelector('#jobInput');
export const profileInfoName = document.querySelector('.profile-info__name');
export const profileInfoJob = document.querySelector('.profile-info__job');

export const elementList = document.querySelector('.elements__list');

//export const cardsTemplate = document.querySelector('#cardsElement').content;

export const imageAddForm = document.querySelector('#ImageAddForm');
export const nameImage = document.querySelector('#nameImage');
export const urlImage = document.querySelector('#urlImage');

//export const popupEditCloseButton = popupEditForm.querySelector('.popup__close-button');
//export const popupAddCloseButton = elementAddForm.querySelector('.popup__close-button');
//export const popupCloseButtonImage = imagePopup.querySelector('.popup__close-button');

//export const imagePopupPicture = imagePopup.querySelector('.popup__image-figure');
//export const imagePopupFigcaption = imagePopup.querySelector('.popup__figcaption');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];