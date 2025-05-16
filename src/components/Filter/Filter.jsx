import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setPage } from '../../redux/cars/carsSlice.js';
import { getCarBrands } from '../../api/rentalApi.js';
import { selectFilter } from '../../redux/cars/carsSelectors.js';
import { Loader } from '../Loader/Loader.jsx';
import styles from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  const [localBrandFilter, setLocalBrandFilter] = useState(filter.brand);
  const [localPriceFilter, setLocalPriceFilter] = useState(filter.price);
  const [localMileageFrom, setLocalMileageFrom] = useState(filter.mileageFrom);
  const [localMileageTo, setLocalMileageTo] = useState(filter.mileageTo);

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

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

  useEffect(() => {
    setLocalBrandFilter(filter.brand);
    setLocalPriceFilter(filter.price);
    setLocalMileageFrom(filter.mileageFrom);
    setLocalMileageTo(filter.mileageTo);
  }, [filter]);

  const handleBrandChange = useCallback((event) => {
    setLocalBrandFilter(event.target.value);
  }, []);

  const handlePriceChange = useCallback((event) => {
    setLocalPriceFilter(event.target.value);
  }, []);

  const handleMileageFromChange = useCallback((event) => {
    setLocalMileageFrom(event.target.value);
  }, []);

  const handleMileageToChange = useCallback((event) => {
    setLocalMileageTo(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(setPage(1));

    dispatch(
      setFilter({
        brand: localBrandFilter,
        price: localPriceFilter,
        mileageFrom: localMileageFrom,
        mileageTo: localMileageTo,
      })
    );
  }, [
    dispatch,
    localBrandFilter,
    localMileageFrom,
    localMileageTo,
    localPriceFilter,
  ]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      handleSearch();
    },
    [handleSearch]
  );

  const toggleBrandOpen = useCallback(() => {
    setIsBrandOpen((prev) => !prev);
  }, []);

  const togglePriceOpen = useCallback(() => {
    setIsPriceOpen((prev) => !prev);
  }, []);

  return (
    <form className={styles.filter} onSubmit={handleSubmit}>
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <label htmlFor="brand" className={styles.label}>
            Car brand
          </label>
          {loadingBrands ? (
            <Loader size="small" />
          ) : (
            <div
              className={`${styles.selectContainer} ${
                isBrandOpen ? styles.open : ''
              }`}
              onClick={toggleBrandOpen}
            >
              <select
                id="brand"
                className={styles.select}
                value={localBrandFilter}
                onChange={handleBrandChange}
                onFocus={toggleBrandOpen}
                onBlur={toggleBrandOpen}
              >
                <option value="">Choose a brand</option>
                {brands.map((brand) => (
                  <option
                    className={styles.optionBrand}
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="price" className={styles.label}>
            Price / 1 hour
          </label>
          <div
            className={`${styles.selectContainer} ${
              isPriceOpen ? styles.open : ''
            }`}
            onClick={togglePriceOpen}
          >
            <select
              id="price"
              className={styles.select}
              value={localPriceFilter}
              onChange={handlePriceChange}
              onFocus={togglePriceOpen}
              onBlur={togglePriceOpen}
            >
              <option value="">Choose a price</option>
              <option className={styles.optionPrice} value="20">
                до 20
              </option>
              <option className={styles.optionPrice} value="50">
                до 50
              </option>
              <option className={styles.optionPrice} value="100">
                до 100
              </option>
              <option className={styles.optionPrice} value="200">
                до 200
              </option>
            </select>
          </div>
        </div>

        <div className={`${styles.filterGroup} ${styles.filterGroup_mileage}`}>
          <label className={styles.label}>Car mileage / km</label>
          <div className={styles.mileageInputs}>
            <input
              type="number"
              placeholder="From"
              className={styles.input}
              value={localMileageFrom}
              onChange={handleMileageFromChange}
            />
            <input
              type="number"
              placeholder="To"
              className={styles.input}
              value={localMileageTo}
              onChange={handleMileageToChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
};
