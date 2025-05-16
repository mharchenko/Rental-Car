import React from 'react';
import styles from './LoadMoreButton.module.css';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
};
