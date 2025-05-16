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

  const isFavorite = car && favorites.some((favCar) => favCar?.id === car.id);

  const handleAddToFavorites = () => {
    if (!car) return;
    dispatch(toggleFavorite(car));
  };

  const addressParts = car.address?.split(',').map((part) => part.trim()) || [];
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={car.img} alt={car.model} className={styles.image} />
        <div className={styles.favoriteWrapper}>
          <FavoriteButton car={car} />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.topRow}>
          <h3 className={styles.model}>
            <span className={styles.brand}>{car.brand}</span>{' '}
            <span className={styles.modelName}>{car.model}</span>
            <span className={styles.comma}>,</span>{' '}
            <span className={styles.year}>{car.year}</span>
          </h3>

          <div className={styles.price}>
            <span className={styles.dollarSign}>$</span>
            {car.rentalPrice}
          </div>
        </div>

        <ul className={styles.features}>
          <li>{city}</li>
          <li>{country}</li>
          <li>{car.rentalCompany}</li>
          <li>{car.type}</li>
          <li>{formatNumberWithSpaces(car.mileage)} km</li>
        </ul>

        <Link to={`/catalog/${car.id}`} className={styles.readMoreButton}>
          Read more
        </Link>
      </div>
    </li>
  );
};

export default CarCard;
