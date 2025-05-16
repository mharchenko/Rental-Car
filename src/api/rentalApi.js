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
    const response = await rentalApi.get('/cars');

    let allCars = [];
    let totalCars = 0;
    let totalPages = 1;

    if (Array.isArray(response.data)) {
      allCars = response.data;
      totalCars = response.data.length;
    } else if (response.data && Array.isArray(response.data.cars)) {
      allCars = response.data.cars;
      totalCars = response.data.totalCars || response.data.cars.length;
      totalPages = response.data.totalPages || Math.ceil(totalCars / limit);
    } else {
      console.error('Unexpected API response format:', response.data);
      return { cars: [], totalCars: 0, totalPages: 0 };
    }

    let filteredCars = [...allCars];

    if (brand) {
      filteredCars = filteredCars.filter((car) => car.brand === brand);
    }

    if (price) {
      filteredCars = filteredCars.filter((car) => {
        try {
          const carPrice = Number(car.rentalPrice.replace('$', ''));
          return carPrice <= Number(price);
        } catch (error) {
          console.error('Error filtering by price:', error);
          return false;
        }
      });
    }

    if (mileageFrom && !isNaN(Number(mileageFrom))) {
      filteredCars = filteredCars.filter(
        (car) => car.mileage && car.mileage >= Number(mileageFrom)
      );
    }

    if (mileageTo && !isNaN(Number(mileageTo))) {
      filteredCars = filteredCars.filter(
        (car) => car.mileage && car.mileage <= Number(mileageTo)
      );
    }

    const totalFilteredCars = filteredCars.length;

    const filteredTotalPages = Math.ceil(totalFilteredCars / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalFilteredCars);

    const carsForCurrentPage = filteredCars.slice(startIndex, endIndex);

    return {
      cars: carsForCurrentPage,
      totalCars: totalFilteredCars,
      page: page,
      totalPages: filteredTotalPages,
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
