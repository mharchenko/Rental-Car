import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCarsThunk, setPage } from '../../redux/cars/carsSlice.js';
import {
  selectCars,
  selectLoading,
  selectError,
  selectPage,
  selectFilter,
} from '../../redux/cars/carsSelectors.js';
import CarCard from '../../components/CarCard/CarCard.jsx';
import { Filter } from '../../components/Filter/Filter.jsx';
import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton.jsx';
import { Loader } from '../../components/Loader/Loader.jsx';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const { cars: allCars = [], totalCars = 0 } = useSelector(selectCars); // ⬅️ деструктуризація
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const [visibleCars, setVisibleCars] = useState([]);

  const CARS_PER_PAGE = 12;

  useEffect(() => {
    const fetchCars = async () => {
      await dispatch(fetchAllCarsThunk({ ...filter }));
    };

    fetchCars();
    dispatch(setPage(1));
  }, [dispatch, filter]);

  useEffect(() => {
    const start = 0;
    const end = page * CARS_PER_PAGE;
    setVisibleCars(allCars.slice(start, end)); // ✅ працює з масивом
  }, [allCars, page]);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  const shouldShowLoadMore = visibleCars.length < totalCars;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading cars: {error}</p>;
  }

  return (
    <div className={styles.catalogPage}>
      <h1>Catalog of cars</h1>
      <Filter />
      {visibleCars.length > 0 ? (
        <ul className={styles.carList}>
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      ) : (
        <p>No cars found according to the specified criteria.</p>
      )}
      {shouldShowLoadMore && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default CatalogPage;
