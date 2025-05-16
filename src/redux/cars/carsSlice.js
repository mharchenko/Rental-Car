import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as rentalApi from '../../api/rentalApi';

export const fetchAllCarsThunk = createAsyncThunk(
  'cars/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await rentalApi.fetchAllCars(params);
      return { ...data, requestedPage: params.page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: { cars: [], totalCars: 0, page: 1, totalPages: 0 },
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
      const newPage = action.payload;
      const maxPage = state.items.totalPages || 1;

      if (newPage < 1) {
        state.page = 1;
      } else if (maxPage && newPage > maxPage) {
        state.page = maxPage;
      } else {
        state.page = newPage;
      }
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };

      state.page = 1;
    },
    resetCars(state) {
      state.items = { cars: [], totalCars: 0, page: 1, totalPages: 0 };
      state.page = 1;
      state.error = null;
      state.loading = false;
    },
    resetPage(state) {
      state.page = 1;
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

        if (!action.payload || typeof action.payload !== 'object') {
          console.error('Unexpected payload format:', action.payload);
          return;
        }

        const { cars, totalCars, page, totalPages, requestedPage } =
          action.payload;

        if (requestedPage === 1) {
          state.items = {
            cars: cars || [],
            totalCars: totalCars || 0,
            page: page || 1,
            totalPages: totalPages || 0,
          };
        } else {
          const existingCars = state.items.cars || [];
          const newCars = cars || [];

          const existingIds = new Set(existingCars.map((car) => car.id));
          const uniqueNewCars = newCars.filter(
            (car) => !existingIds.has(car.id)
          );

          state.items = {
            cars: [...existingCars, ...uniqueNewCars],
            totalCars: totalCars || 0,
            page: page || state.items.page,
            totalPages: totalPages || state.items.totalPages,
          };
        }

        if (state.page > state.items.totalPages && state.items.totalPages > 0) {
          state.page = state.items.totalPages;
        }
      })
      .addCase(fetchAllCarsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setFilter, resetCars, resetPage } = carsSlice.actions;
export default carsSlice.reducer;
