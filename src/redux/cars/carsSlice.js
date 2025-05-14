import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCars } from '../../api/rentalApi';

export const fetchAllCarsThunk = createAsyncThunk(
  'cars/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await fetchAllCars(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalItems: 0,
  page: 1,
  filter: {
    brand: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
      state.filter = {
        brand: '',
        price: '',
        mileageFrom: '',
        mileageTo: '',
      };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.filter.brand = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.filter.price = action.payload;
    },
    setMileageFromFilter: (state, action) => {
      state.filter.mileageFrom = action.payload;
    },
    setMileageToFilter: (state, action) => {
      state.filter.mileageTo = action.payload;
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
        state.items = [...state.items, ...action.payload.cars];
        state.totalItems = action.payload.totalCars;
      })
      .addCase(fetchAllCarsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetCars,
  setPage,
  setBrandFilter,
  setPriceFilter,
  setMileageFromFilter,
  setMileageToFilter,
} = carsSlice.actions;

export default carsSlice.reducer;
