import React from 'react'
import resOk from '../images/Rectangle_ok.svg'
import resNo from '../images/Union.svg'

function InfoTooltip({ isOpen, onClose, isAuthSuccess, registrationOk, registrationFalse, handleOverlayClose }) {

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" onClick={onClose} />
                <form className="form form_sign-in" >
                    <img src={isAuthSuccess ? resOk : resNo} alt={isAuthSuccess ? registrationOk : registrationFalse}></img>
                    <h2 className="form__information">{isAuthSuccess ? registrationOk : registrationFalse}</h2>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip