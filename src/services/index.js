import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://devtest.ge',
});

export const getCountriesRequest = () => {
  return instance.get('/countries');
};

export const getCountryStatisticsRequest = (code) => {
  return instance.post('/get-country-statistics', { code });
};
