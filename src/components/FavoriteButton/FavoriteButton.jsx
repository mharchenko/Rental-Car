
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { selectFavorites } from '../../redux/favorites/favoritesSelectors';
import { Heart } from 'lucide-react';

const FavoriteButton = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (car) {
      setIsFavorite(favorites.some((favCar) => favCar.id === car.id));
    }
  }, [favorites, car]);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(car));
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className="absolute top-4 right-4 bg-transparent border-none cursor-pointer z-10"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
      ) : (
        <Heart className="h-6 w-6 text-gray-300" />
      )}
    </button>
  );
};

export default FavoriteButton;
