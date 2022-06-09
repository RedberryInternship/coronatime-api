const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.APP_URL,
})

const getCountriesRequest = () => instance.get('/countries')

const getCountryStatisticsRequest = (code) =>
  instance.post('/get-country-statistics', { code })

module.exports = {
  getCountriesRequest,
  getCountryStatisticsRequest,
}
