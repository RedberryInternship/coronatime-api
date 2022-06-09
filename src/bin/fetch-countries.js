const dotenv = require('dotenv')
const chalk = require('chalk')
const {
  getCountriesRequest,
  getCountryStatisticsRequest,
} = require('../services/index')
const connectToDB = require('../config/mongo')
const { Country } = require('../models/index')

dotenv.config()
;(async () => {
  let mongoose = null
  try {
    mongoose = await connectToDB()
    await Country.deleteMany()

    const { data: countries } = await getCountriesRequest()
    const countryCodes = countries.map((el) => el.code)

    const countriesHashMap = new Map()

    for (const ctr of countries) {
      countriesHashMap.set(ctr.code, ctr)
    }

    const result = await Promise.all(
      countryCodes.map((code) => getCountryStatisticsRequest(code))
    )

    const fetchedStatistics = result.map((el) => el.data)

    const finalDataToInsert = fetchedStatistics.map((el) => ({
      ...countriesHashMap.get(el.code),
      statistics: {
        confirmed: el.confirmed,
        recovered: el.recovered,
        critical: el.critical,
        deaths: el.deaths,
      },
    }))

    await Country.insertMany(finalDataToInsert)
    console.log(
      chalk.whiteBright.bgBlue.underline(
        'Countries statistics has been fetched!'
      )
    )
  } catch (e) {
    console.log(chalk.red.underline(e.message))
  } finally {
    await mongoose.connection.close()
  }
})()
