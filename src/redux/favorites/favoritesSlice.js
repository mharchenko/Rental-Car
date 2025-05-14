import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const car = action.payload;
      const existingCar = state.items.find((item) => item.id === car.id);

      if (existingCar) {
        state.items = state.items.filter((item) => item.id !== car.id);
      } else {
        state.items.push(car);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
