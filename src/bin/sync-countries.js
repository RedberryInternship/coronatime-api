import chalk from 'chalk'
import dotenv from 'dotenv'
import connectToDB from '../config/mongo.js'
import { getCountryStatisticsRequest } from '../services/index.js'
import { Country } from '../models/index.js'

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
