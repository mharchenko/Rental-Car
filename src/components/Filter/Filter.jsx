import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBrandFilter,
  setPriceFilter,
  setMileageFromFilter,
  setMileageToFilter,
  resetCars,
} from '../../redux/cars/carsSlice.js';
import { fetchAllCars, getCarBrands } from '../../api/rentalApi.js';
import { selectFilter } from '../../redux/filter/filterSelectors.js';
import styles from './Filter.module.css';
import { Loader } from '../Loader/Loader.jsx';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await getCarBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error loading brands:', error);
      } finally {
        setLoadingBrands(false);
      }
    };

    loadBrands();
  }, []);

  const handleBrandChange = (event) => {
    dispatch(resetCars());
    dispatch(setBrandFilter(event.target.value));
  };

  const handlePriceChange = (event) => {
    dispatch(resetCars());
    dispatch(setPriceFilter(event.target.value));
  };

  const handleMileageFromChange = (event) => {
    console.log('handleMileageFromChange викликано:', event.target.value);
    dispatch(resetCars());
    dispatch(setMileageFromFilter(event.target.value));
  };

  const handleMileageToChange = (event) => {
    console.log('handleMileageToChange викликано:', event.target.value);
    dispatch(resetCars());
    dispatch(setMileageToFilter(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <h3>Фільтр автомобілів</h3>

      <div className={styles.filterGroup}>
        <label htmlFor="brand" className={styles.label}>
          Марка:
        </label>
        {loadingBrands ? (
          <Loader size="small" />
        ) : (
          <select
            id="brand"
            className={styles.select}
            value={filter.brand}
            onChange={handleBrandChange}
          >
            <option value="">Всі марки</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="price" className={styles.label}>
          Ціна (за день):
        </label>
        <select
          id="price"
          className={styles.select}
          value={filter.price}
          onChange={handlePriceChange}
        >
          <option value="">Будь-яка ціна</option>
          <option value="20">до 20</option>
          <option value="50">до 50</option>
          <option value="100">до 100</option>
          <option value="200">до 200</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Пробіг (км):</label>
        <div className={styles.mileageInputs}>
          <input
            type="number"
            placeholder="Від"
            className={styles.input}
            value={filter.mileageFrom}
            onChange={handleMileageFromChange}
          />
          <input
            type="number"
            placeholder="До"
            className={styles.input}
            value={filter.mileageTo}
            onChange={handleMileageToChange}
          />
        </div>
      </div>
    </div>
  );
};
