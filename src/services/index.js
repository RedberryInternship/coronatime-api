import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://devtest.ge',
})

export const getCountriesRequest = () => instance.get('/countries')

export const getCountryStatisticsRequest = (code) =>
  instance.post('/get-country-statistics', { code })
