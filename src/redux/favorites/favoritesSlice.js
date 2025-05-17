import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const isValidCar = (car) => {
  return car && typeof car === 'object' && car.id !== undefined;
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      try {
        const car = action.payload;

        if (!isValidCar(car)) {
          return state;
        }

        const existingIndex = state.items.findIndex(
          (item) => item && item.id === car.id
        );

        if (existingIndex !== -1) {
          state.items.splice(existingIndex, 1);
        } else {
          state.items.push(car);
        }

        state.items = state.items.filter((item) => isValidCar(item));
      } catch (error) {}
    },

    addToFavorites: (state, action) => {
      try {
        const car = action.payload;

        if (!isValidCar(car)) {
          return state;
        }

        const exists = state.items.some((item) => item && item.id === car.id);
        if (!exists) {
          state.items.push(car);
        }

        state.items = state.items.filter((item) => isValidCar(item));
      } catch (error) {}
    },

    removeFromFavorites: (state, action) => {
      try {
        const carId = action.payload;

        if (carId === undefined) {
          return state;
        }

        state.items = state.items.filter((item) => item && item.id !== carId);
      } catch (error) {}
    },

    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
