import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global/';

const rentalApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchAllCars = async (params = {}) => {
  try {
    const response = await rentalApi.get('/cars', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await rentalApi.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};

export const getCarBrands = async () => {
  try {
    const response = await rentalApi.get('/brands');
    return response.data;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    throw error;
  }
};
