import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as rentalApi from '../../api/rentalApi';

export const fetchAllCarsThunk = createAsyncThunk(
  'cars/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await rentalApi.fetchAllCars(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: { cars: [], totalCars: 0 },
    loading: false,
    error: null,
    page: 1,
    filter: {
      brand: '',
      price: '',
      mileageFrom: '',
      mileageTo: '',
    },
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetCars(state) {
      state.items = { cars: [], totalCars: 0 };
      state.page = 1;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCarsThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (state.page === 1) {
          state.items = action.payload;
        } else {
          state.items = {
            cars: [...state.items.cars, ...action.payload.cars],
            totalCars: action.payload.totalCars,
          };
        }
      })
      .addCase(fetchAllCarsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setFilter, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
