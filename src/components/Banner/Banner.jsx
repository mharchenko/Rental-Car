import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.css';
import heroImage from '../../img/hero-image.png';

export const Banner = () => {
  const navigate = useNavigate();

  const handleViewCatalogClick = () => {
    navigate('/catalog');
  };

  return (
    <div className={styles.banner}>
      <img src={heroImage} alt="Car for rent" className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={handleViewCatalogClick}
        >
          View Catalog
        </button>
      </div>
    </div>
  );
};
