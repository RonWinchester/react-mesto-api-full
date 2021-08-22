import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, handleOverlayClose}) {
    
    const [nameImage, setNameImage] = React.useState('');
    const [urlImage, setUrlImage] = React.useState('');

    function handleNameImage(e) {
        setNameImage(e.target.value);
    }

    function handleUrlImage(e) {
        setUrlImage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: nameImage,
            link: urlImage
        });
        
    }

    React.useEffect(() => {
        setNameImage('');
        setUrlImage('')
    }, [isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} buttonText='Создать' onClose={onClose} popupId="elementAddForm" formName="elementAddForm" formId="ImageAddForm" title="Новое место" handleOverlayClose={handleOverlayClose}>
            <input className="form__input" value={nameImage} onChange={handleNameImage} type="text" id="nameImage" name="nameImageElement" placeholder="Название" minLength={2} maxLength={30} required />
            <span className="form__input-error" id="nameImage-error" />
            <input className="form__input" value={urlImage} onChange={handleUrlImage} type="url" id="urlImage" name="urlImageElement" placeholder="Ссылка на картинку" required />
            <span className="form__input-error" id="urlImage-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup