import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopupForm({
  isOpen,
  onClose,
  handleOverlayClose,
  handleCardDelete,
  isCardDelet
}) {
  function handleCardDeleteButton(e) {
    e.preventDefault();
    handleCardDelete(isCardDelet);
  }

  return (
    <PopupWithForm
      onSubmit={handleCardDeleteButton}
      isOpen={isOpen}
      buttonText="Да"
      onClose={onClose}
      popupId="deletionCardForm"
      formName="deletionCardForm"
      formId="CardRemoveForm"
      title="Вы уверены?"
      handleOverlayClose={handleOverlayClose}
    ></PopupWithForm>
  );
}

export default DeletePopupForm;
