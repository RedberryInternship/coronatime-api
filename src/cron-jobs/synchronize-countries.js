import axios from 'axios';
import { Country } from '../models/index.js';

const instance = axios.create({
  baseURL: 'https://devtest.ge',
});

const synchronizeCountries = async () => {
  const { data } = await instance.get('countries');
  await Country.deleteMany();
  await Country.insertMany(data);
};

export default synchronizeCountries;
