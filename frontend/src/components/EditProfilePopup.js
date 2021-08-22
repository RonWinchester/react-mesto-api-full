import React from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, handleOverlayClose }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} buttonText='Сохранить' onClose={onClose} popupId="profileEditForm" formName="profileEdit" formId="profileForm" title="Редактировать профиль" handleOverlayClose={handleOverlayClose}>
            <input className="form__input" value={name} onChange={handleNameChange} type="text" id="nameInput" name="name" placeholder="Имя" minLength={2} maxLength={40} required />
            <span className="form__input-error" id="nameInput-error" />
            <input className="form__input" value={description} onChange={handleDescriptionChange} type="text" id="jobInput" name="about" placeholder="О себе" minLength={2} maxLength={200} required />
            <span className="form__input-error" id="jobInput-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup