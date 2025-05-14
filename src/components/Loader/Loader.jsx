import React from 'react';
import styles from './Loader.module.css';

export const Loader = ({ size = 'medium' }) => {
  const loaderSizeClass = size === 'small' ? styles.small : styles.medium;

  return (
    <div className={`${styles.loaderContainer} ${loaderSizeClass}`}>
      <div className={styles.loader}></div>
    </div>
  );
};
