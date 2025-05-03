import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";

function Toast({ message, title, imageSrc, onClose }) {
  return (
    <div className="notification-toast" data-toast="">
      <button className="toast-close-btn" onClick={onClose} data-toast-close="">
        <IonIcon icon={closeOutline} />
      </button>
      <div className="toast-banner">
        <img src={imageSrc} alt={title} width={80} height={70} />
      </div>
      <div className="toast-detail">
        <p className="toast-message">{message}</p>
        <p className="toast-title">{title}</p>
        <p className="toast-meta">
          <time dateTime="PT2M">2 Minutes</time> ago
        </p>
      </div>
    </div>
  );
}

export default Toast;
