import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice.js';
import { selectFavorites } from '../../redux/favorites/favoritesSelectors.js';
import { formatNumberWithSpaces } from '../../utils/formatNumberWithSpaces.js';
import styles from './CarCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx';

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((favCar) => favCar?.id === car?.id);

  const handleAddToFavorites = () => {
    dispatch(toggleFavorite(car));
  };

  return (
    <li className={styles.card}>
      <img src={car.img} alt={car.model} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.model}>
            {car.make}{' '}
            <span className={styles.year}>
              {car.model}, {car.year}
            </span>
          </h3>
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleAddToFavorites}
          />
        </div>
        <ul className={styles.features}>
          <li className={styles.featureItem}>
            {car.address.split(',')[1]?.trim()} |{' '}
            {car.address.split(',')[2]?.trim()}
          </li>
          <li className={styles.featureItem}>{car.engineVolume}</li>
          <li className={styles.featureItem}>
            {formatNumberWithSpaces(car.mileage)} km
          </li>
          <li className={styles.featureItem}>{car.rentalPrice}</li>
        </ul>
        <Link to={`/catalog/${car.id}`} className={styles.readMoreButton}>
          Детальніше
        </Link>
      </div>
    </li>
  );
};

export default CarCard;
