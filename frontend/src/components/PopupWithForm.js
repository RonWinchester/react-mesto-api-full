import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.popupId} onClick={props.handleOverlayClose} >
            <div className="popup__content">
                <button className="popup__close-button" type="button" onClick={props.onClose}/>
                <form className="form" name={props.formName} id={props.formId}  autoComplete="on" onSubmit={props.onSubmit}>
                    <h2 className="form__name">{props.title}</h2>
                    <fieldset className="form__fildset">
                        {props.children}
                        <button className="form__button" type="submit">{props.buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm