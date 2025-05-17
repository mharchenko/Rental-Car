import React, { useEffect } from 'react';
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

  const {
    cars: allCars = [],
    totalCars = 0,
    totalPages = 0,
  } = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);

  const CARS_PER_PAGE = 12;

  useEffect(() => {
    console.log(`Loading page ${page} with limit ${CARS_PER_PAGE}...`);
    dispatch(fetchAllCarsThunk({ ...filter, page, limit: CARS_PER_PAGE }));
  }, [dispatch, filter, page, CARS_PER_PAGE]);

  useEffect(() => {
    console.log('Cars data state:', {
      currentPage: page,
      totalPages,
      loadedCars: allCars.length,
      totalCars,
      shouldShowLoadMore: page < totalPages && allCars.length < totalCars,
    });
  }, [page, totalPages, allCars.length, totalCars]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      console.log(`Loading next page: ${page + 1}...`);
      dispatch(setPage(page + 1));
    }
  };

  const moreToLoad = page < totalPages && allCars.length < totalCars;

  if (loading && page === 1) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading cars: {error}</p>;
  }

  return (
    <div className={styles.catalogPage}>
      <Filter />

      {allCars.length > 0 ? (
        <ul className={styles.carList}>
          {allCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      ) : (
        <p>No cars found according to the specified criteria.</p>
      )}

      {loading && page > 1 && <Loader />}

      {moreToLoad && !loading && (
        <div className={styles.loadMoreContainer}>
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
