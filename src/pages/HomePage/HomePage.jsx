import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Banner />
      {/* Додайте тут додатковий контент для головної сторінки, якщо потрібно */}
    </div>
  );
};
