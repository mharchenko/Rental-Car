import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ car }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!car || !car.id) {
      return;
    }

    try {
      const isInFavorites = isFavorite(car.id);
      setIsActive(isInFavorites);
    } catch (error) {
      setIsActive(false);
    }
  }, [car, isFavorite]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (!car || !car.id) {
      return;
    }

    try {
      setIsActive(!isActive);

      toggleFavorite(car);
    } catch (error) {
      setIsActive(!isActive);
    }
  };

  const iconColor = isActive ? '#3470FF' : 'white';
  const iconFill = isActive ? '#3470FF' : 'none';

  return (
    <button
      onClick={handleFavoriteClick}
      className={styles.button}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <Heart size={24} stroke={iconColor} fill={iconFill} strokeWidth={2} />
    </button>
  );
};

export default FavoriteButton;
