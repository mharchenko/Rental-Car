import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../api/rentalApi.js';
import { formatNumberWithSpaces } from '../../utils/formatNumberWithSpaces.js';
import styles from './CarDetails.module.css';
import { Loader } from '../Loader/Loader.jsx';
import { Notification } from '../Notification/Notification.jsx';

export const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRentSuccess, setIsRentSuccess] = useState(false);

  useEffect(() => {
    const getCarDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCarById(id);
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCarDetails();
  }, [id]);

  const handleRentSubmit = (event) => {
    event.preventDefault();

    console.log('Rental data sent:', {
      name: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
    });
    setIsRentSuccess(true);
    setTimeout(() => {
      setIsRentSuccess(false);
    }, 3000);
    event.target.reset();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading car parts: {error}</p>;
  }

  if (!car) {
    return <p>Car not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {car.make} {car.model}
      </h2>
      <div className={styles.detailsContainer}>
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className={styles.image}
        />
        <div className={styles.info}>
          <p className={styles.description}>{car.description}</p>
          <ul className={styles.features}>
            <li>Марка: {car.make}</li>
            <li>Модель: {car.model}</li>
            <li>Рік випуску: {car.year}</li>
            <li>Пробіг: {formatNumberWithSpaces(car.mileage)} km</li>
            <li>Коробка передач: {car.transmission}</li>
            <li>Паливо: {car.fuelType}</li>
            <li>Об'єм двигуна: {car.engineVolume}</li>
            <li>Ціна оренди: {car.rentalPrice}</li>
          </ul>
        </div>
      </div>

      <div className={styles.rentalForm}>
        <h3>Форма оренди</h3>
        <form onSubmit={handleRentSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Ім'я:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Телефон:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.rentButton}>
            Орендувати
          </button>
        </form>
        {isRentSuccess && (
          <Notification
            message="Автомобіль успішно заброньовано!"
            type="success"
          />
        )}
      </div>
    </div>
  );
};
