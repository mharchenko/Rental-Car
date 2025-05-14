// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllCarsThunk, setPage } from '../../redux/cars/carsSlice.js';
// import {
//   selectCars,
//   selectLoading,
//   selectError,
//   selectTotalItems,
//   selectFilter,
//   selectPage,
// } from '../../redux/cars/carsSelectors.js';
// import CarCard from '../../components/CarCard/CarCard.jsx';
// import { Filter } from '../../components/Filter/Filter.jsx';
// import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton.jsx';
// import { Loader } from '../../components/Loader/Loader.jsx';
// import styles from './CatalogPage.module.css';

// const CatalogPage = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector(selectCars);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const totalItems = useSelector(selectTotalItems);
//   const filter = useSelector(selectFilter);
//   const page = useSelector(selectPage);
//   const [visibleCars, setVisibleCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       await dispatch(fetchAllCarsThunk({ ...filter, page }));
//     };

//     fetchCars();
//   }, [dispatch, filter, page]);

//   useEffect(() => {
//     setVisibleCars((prevVisibleCars) => [
//       ...prevVisibleCars,
//       ...cars.slice(visibleCars.length),
//     ]);
//   }, [cars, visibleCars.length]);

//   const handleLoadMore = () => {
//     dispatch(setPage(page + 1));
//   };

//   const shouldShowLoadMore =
//     visibleCars.length > 0 && visibleCars.length < totalItems;

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <p>Error loading cars: {error}</p>;
//   }

//   return (
//     <div className={styles.catalogPage}>
//       <h1>Catalog of cars</h1>
//       <Filter />
//       {visibleCars.length > 0 ? (
//         <ul className={styles.carList}>
//           {visibleCars.map((car) => (
//             <CarCard key={car.id} car={car} />
//           ))}
//         </ul>
//       ) : (
//         <p>No cars found according to the specified criteria.</p>
//       )}
//       {shouldShowLoadMore && <LoadMoreButton onClick={handleLoadMore} />}
//     </div>
//   );
// };

// export default CatalogPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCarsThunk, setPage } from '../../redux/cars/carsSlice.js';
import {
  selectCars,
  selectLoading,
  selectError,
  selectTotalItems,
  selectFilter,
  selectPage,
} from '../../redux/cars/carsSelectors.js';
import CarCard from '../../components/CarCard/CarCard.jsx';
import { Filter } from '../../components/Filter/Filter.jsx';
import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton.jsx';
import { Loader } from '../../components/Loader/Loader.jsx';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalItems = useSelector(selectTotalItems);
  const filter = useSelector(selectFilter);
  const page = useSelector(selectPage);
  const [visibleCars, setVisibleCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      await dispatch(fetchAllCarsThunk({ ...filter, page }));
    };

    // Очищаємо visibleCars при кожній зміні фільтра або сторінки
    setVisibleCars([]);
    fetchCars();
  }, [dispatch, filter, page]);

  useEffect(() => {
    // Додаємо нові автомобілі до visibleCars після їх завантаження
    setVisibleCars((prevVisibleCars) => [...prevVisibleCars, ...cars]);
  }, [cars]);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  const shouldShowLoadMore =
    visibleCars.length > 0 && visibleCars.length < totalItems;

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
