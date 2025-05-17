import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global/';

const rentalApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchAllCars = async ({
  brand = '',
  price = '',
  mileageFrom = '',
  mileageTo = '',
  page = 1,
  limit = 12,
}) => {
  try {
    console.log(`Requesting page ${page} with limit ${limit}...`);

    const response = await rentalApi.get('/cars', {
      params: {
        page,
        limit,
        brand: brand || undefined,
        price: price || undefined,
        mileageFrom: mileageFrom || undefined,
        mileageTo: mileageTo || undefined,
      },
    });

    console.log('API response received:', response.status);

    let cars = [];
    let totalCars = 0;
    let totalPages = 1;

    if (Array.isArray(response.data)) {
      cars = response.data;
      totalCars = response.data.length;
      totalPages = Math.ceil(totalCars / limit);
      console.log(`Received array of ${cars.length} cars`);
    } else if (response.data && Array.isArray(response.data.cars)) {
      cars = response.data.cars;
      totalCars = response.data.totalCars || response.data.cars.length;
      totalPages = response.data.totalPages || Math.ceil(totalCars / limit);
      console.log(
        `Received page ${
          response.data.page || page
        } of ${totalPages} pages, with ${
          cars.length
        } cars (total: ${totalCars})`
      );
    } else {
      console.error('Unexpected API response format:', response.data);
      return { cars: [], totalCars: 0, totalPages: 0, page: page };
    }

    return {
      cars,
      totalCars,
      page: response.data.page || page,
      totalPages,
      requestedPage: page,
    };
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
