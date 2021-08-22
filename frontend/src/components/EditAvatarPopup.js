import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, handleOverlayClose }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} buttonText='Сохранить' onClose={onClose} popupId="avatarEditForm" formName="avatarEditForm" formId="avatarImageEditForm" title="Обновить аватар" handleOverlayClose={handleOverlayClose}>
            <input ref={avatarRef} className="form__input" type="url" id="urlAvatar" name="urlAvatarElement" placeholder="Ссылка на картинку" required />
            <span className="form__input-error" id="urlAvatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup