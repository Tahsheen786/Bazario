// Modal.js
import React from 'react';
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { addOutline, removeOutline, closeOutline } from "ionicons/icons"

function Modal({ isVisible, setIsVisible }) {
  if (!isVisible) return null;

  return (
    <>
      <div className="overlay" onClick={() => setIsVisible(false)}></div>
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close-btn" onClick={() => setIsVisible(false)}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <div className="newsletter-img">
            <img src="./newsletter-img.jpg" alt="Subscribe Newsletter" width="400" height="400" />
          </div>
          <div className="newsletter">
            <form action="#">
              <div className="newsletter-header">
                <h3 className="newsletter-title">Subscribe to Bazario</h3>
                <p className="newsletter-desc">Subscribe to Bazario to get the latest products and discount updates.</p>
              </div>
              <input type="email" placeholder="Email Address" required className="email-field" />
              <button type="submit" className="btn-newsletter">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
