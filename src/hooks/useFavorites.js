import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favorites/favoritesSlice';
import { selectFavorites } from '../redux/favorites/favoritesSelectors';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favoritesFromRedux = useSelector(selectFavorites);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    const validFavorites = Array.isArray(favoritesFromRedux)
      ? favoritesFromRedux.filter((car) => car && car.id)
      : [];

    setFavoritesList(validFavorites);
  }, [favoritesFromRedux]);

  const isFavorite = (carId) => {
    if (!carId) return false;

    return (
      Array.isArray(favoritesList) &&
      favoritesList.some((car) => car && car.id === carId)
    );
  };

  const toggleFavoriteItem = (car) => {
    if (!car || !car.id) {
      return;
    }

    dispatch(toggleFavorite(car));
  };

  return {
    favorites: favoritesList || [],
    count: favoritesList?.length || 0,
    isFavorite,
    toggleFavorite: toggleFavoriteItem,
  };
};
