import React, { useEffect } from 'react';
import styles from './Notification.module.css';

export const Notification = ({ message, type, duration = 3000, onClose }) => {
  const notificationClass = type === 'success' ? styles.success : styles.error;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      {message}
    </div>
  );
};
