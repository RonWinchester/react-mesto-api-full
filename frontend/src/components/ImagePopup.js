import React from 'react';

function ImagePopup(props) {
    return (
        <div className= {`popup ${props.card.link ? 'popup_opened' : ''}`} id="imagePopup" onClick={props.handleOverlayClose}>
            <figure className="popup__figure">
                <button className="popup__close-button" type="button" onClick={props.onClose} />
                <img className="popup__image-figure"
                    src={props.card.link} alt={props.card.name} />
                <figcaption className="popup__figcaption">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup