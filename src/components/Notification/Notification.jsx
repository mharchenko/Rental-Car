import React from 'react';
import styles from './Notification.module.css';

export const Notification = ({ message, type }) => {
  const notificationClass = type === 'success' ? styles.success : styles.error;

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      {message}
    </div>
  );
};
