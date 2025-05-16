import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { selectFavorites } from '../../redux/favorites/favoritesSelectors';
import { Heart } from 'lucide-react';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!car || !car.id) return;
    const isFav = favorites.some((favCar) => favCar?.id === car.id);
    setIsFavorite(isFav);
  }, [favorites, car]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (!car) return;

    setIsFavorite(!isFavorite);

    dispatch(toggleFavorite(car));
  };

  const iconColor = isFavorite ? '#3470FF' : 'white';
  const iconFill = isFavorite ? '#3470FF' : 'none';

  return (
    <button
      onClick={handleFavoriteClick}
      className={styles.button}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <Heart size={24} stroke={iconColor} fill={iconFill} strokeWidth={2} />
    </button>
  );
};

export default FavoriteButton;
