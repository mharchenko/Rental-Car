// import axios from 'axios';

// const BASE_URL = 'https://car-rental-api.goit.global/';

// const rentalApi = axios.create({
//   baseURL: BASE_URL,
// });

// export const fetchAllCars = async (params = {}) => {
//   try {
//     const response = await rentalApi.get('/cars', { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     throw error;
//   }
// };

// export const fetchCarById = async (id) => {
//   try {
//     const response = await rentalApi.get(`/cars/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching car with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const getCarBrands = async () => {
//   try {
//     const response = await rentalApi.get('/brands');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching car brands:', error);
//     throw error;
//   }
// };

import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global/';

const rentalApi = axios.create({
  baseURL: BASE_URL,
});

// Оновлено: додано підтримку пагінації через `page` і `limit`
export const fetchAllCars = async ({
  brand = '',
  price = '',
  mileageFrom = '',
  mileageTo = '',
  page = 1,
  limit = 12,
}) => {
  try {
    const params = {
      brand,
      price,
      mileageFrom,
      mileageTo,
      page,
      limit,
    };

    const response = await rentalApi.get('/cars', { params });

    // Перевірка чи це масив (стара версія API без пагінації)
    if (Array.isArray(response.data)) {
      const start = (page - 1) * limit;
      const paginatedCars = response.data.slice(start, start + limit);
      return {
        cars: paginatedCars,
        totalCars: response.data.length,
      };
    }

    // У випадку, якщо бекенд уже підтримує пагінацію
    return {
      cars: response.data.cars || [],
      totalCars: response.data.totalCars || 0,
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
