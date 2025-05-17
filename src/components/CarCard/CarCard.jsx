import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumberWithSpaces } from '../../utils/formatNumberWithSpaces.js';
import styles from './CarCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx';

const CarCard = ({ car, onReadMoreClick }) => {
  const navigate = useNavigate();

  const addressParts = car.address?.split(',').map((part) => part.trim()) || [];
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';

  const handleReadMoreClick = (e) => {
    e.preventDefault();

    if (onReadMoreClick) {
      onReadMoreClick(car.id);
    } else {
      navigate(`/catalog/${car.id}`);
    }
  };

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

        <button onClick={handleReadMoreClick} className={styles.readMoreButton}>
          Read more
        </button>
      </div>
    </li>
  );
};

export default CarCard;
