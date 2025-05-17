import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { fetchCarById } from '../../api/rentalApi.js';
import { formatNumberWithSpaces } from '../../utils/formatNumberWithSpaces.js';
import { Loader } from '../Loader/Loader.jsx';
import { Notification } from '../Notification/Notification.jsx';
import styles from './CarDetails.module.css';
import icons from '../../img/icons.svg';

export const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [notification, setNotification] = useState(null);

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

  const handleGoBack = () => {
    navigate('/catalog');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.bookingDate) {
      setNotification({
        message: 'Please fill all required fields',
        type: 'error',
      });
      return;
    }

    console.log('Booking car:', {
      carId: car.id,
      brand: car.brand,
      model: car.model,
      ...formData,
    });

    setNotification({
      message: 'Car successfully booked! We will contact you soon.',
      type: 'success',
    });

    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Error loading car details: {error}</p>;
  }

  if (!car) {
    return <p className={styles.notFound}>Car not found.</p>;
  }

  const addressParts = car.address?.split(',').map((part) => part.trim()) || [];
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';

  let rentalConditions = [];
  if (Array.isArray(car.rentalConditions)) {
    rentalConditions = car.rentalConditions;
  } else if (typeof car.rentalConditions === 'string') {
    rentalConditions = car.rentalConditions.split('\n');
  }

  const ageCondition = rentalConditions.find((condition) =>
    condition.toLowerCase().includes('minimum age')
  );
  let minimumAge = '';
  if (ageCondition) {
    const ageMatch = ageCondition.match(/\d+/);
    minimumAge = ageMatch ? ageMatch[0] : '';
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageContainer}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.carImage}
            />
          </div>

          <div className={styles.bookingSection}>
            <div className={styles.bookingTitleWrapper}>
              <h3 className={styles.bookingTitle}>Book your car now</h3>
              <p className={styles.bookingText}>
                Stay connected! We are always ready to help you.
              </p>
            </div>

            <form className={styles.bookingForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name*"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email*"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  className={styles.formInput}
                  value={formData.bookingDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Comment"
                  className={styles.formTextarea}
                  value={formData.comment}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.detailsBlock}>
            <h1 className={styles.carTitle}>
              {car.brand} {car.model}, {car.year}
              <span className={styles.idSeparator}></span>
              <span className={styles.carId}>
                ID: {car.id?.substring(0, 4) || 'N/A'}
              </span>
            </h1>

            <div className={styles.locationInfo}>
              <MapPin size={16} className={styles.locationIcon} />
              <span>
                {city}, {country}
              </span>
              <span className={styles.separator}>|</span>
              <span>Mileage: {formatNumberWithSpaces(car.mileage)} km</span>
            </div>

            <div className={styles.priceInfo}>
              <span className={styles.price}>${car.rentalPrice}</span>
            </div>

            <p className={styles.description}>{car.description}</p>
          </div>

          <div className={styles.carInfoBlock}>
            <div className={styles.conditionsSection}>
              <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
              <ul className={styles.conditionsList}>
                {minimumAge && (
                  <li className={styles.conditionItem}>
                    <svg className={styles.checkIcon}>
                      <use href={`${icons}#icon-check-circle`} />
                    </svg>
                    Minimum age : {minimumAge}
                  </li>
                )}
                {rentalConditions
                  .filter((c) => !c.toLowerCase().includes('minimum age'))
                  .map((condition, index) => (
                    <li key={index} className={styles.conditionItem}>
                      <svg className={styles.checkIcon}>
                        <use href={`${icons}#icon-check-circle`} />
                      </svg>
                      {condition}
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles.specificationSection}>
              <h2 className={styles.sectionTitle}>Car Specifications:</h2>
              <ul className={styles.specsList}>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon}>
                    <use href={`${icons}#icon-calendar`} />
                  </svg>
                  Year: {car.year}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon}>
                    <use href={`${icons}#icon-car`} />
                  </svg>
                  Type: {car.type}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon}>
                    <use href={`${icons}#icon-fuel-pump`} />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon}>
                    <use href={`${icons}#icon-gear`} />
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={styles.accessoriesSection}>
              <h2 className={styles.sectionTitle}>
                Accessories and functionalities:
              </h2>
              <ul className={styles.accessoriesList}>
                {car.accessories &&
                  car.accessories.map((item, index) => (
                    <li
                      key={`accessory-${index}`}
                      className={styles.accessoryItem}
                    >
                      <svg className={styles.checkIcon}>
                        <use href={`${icons}#icon-check-circle`} />
                      </svg>
                      {item}
                    </li>
                  ))}

                {car.functionalities &&
                  car.functionalities.map((item, index) => (
                    <li
                      key={`functionality-${index}`}
                      className={styles.accessoryItem}
                    >
                      <svg className={styles.checkIcon}>
                        <use href={`${icons}#icon-check-circle`} />
                      </svg>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button className={styles.backButton} onClick={handleGoBack}>
        Back to catalog
      </button>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};
