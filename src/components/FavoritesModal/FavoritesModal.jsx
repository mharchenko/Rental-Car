import React from 'react';
import { X } from 'lucide-react';
import styles from './FavoritesModal.module.css';
import CarCard from '../CarCard/CarCard';
import { useFavorites } from '../../hooks/useFavorites';

const FavoritesModal = ({ onClose }) => {
  const { favorites, count } = useFavorites();

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleContentClick}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            My favorite cars
            {count > 0 && <span className={styles.count}>({count})</span>}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {favorites && favorites.length > 0 ? (
            <ul className={styles.carList}>
              {favorites.map((car) => {
                if (!car || !car.id) {
                  return null;
                }

                return <CarCard key={car.id} car={car} />;
              })}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <p>You have not added any cars to your favorites yet.</p>
              <p>Browse the catalog to find cars.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
