const dotenv = require('dotenv')
const chalk = require('chalk')
const connectToDB = require('../config/mongo')
const { getCountryStatisticsRequest } = require('../services/index')
const { Country } = require('../models/index')

dotenv.config()

let mongoose = null

;(async () => {
  try {
    mongoose = await connectToDB()
    const countries = await Country.find()

    for (const country of countries) {
      const { data } = await getCountryStatisticsRequest(country.code)

      const statistics = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        critical: data.critical,
        deaths: data.deaths,
      }

      country.statistics = statistics
      await country.save()
    }

    console.log(
      chalk.whiteBright.bold.bgBlueBright.underline(
        'Countries have been synced!'
      )
    )
  } catch (e) {
    console.log(chalk.underline.red(e.message))
  } finally {
    await mongoose.connection.close()
  }
})()
