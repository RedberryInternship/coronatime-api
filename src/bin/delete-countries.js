const dotenv = require('dotenv')
const chalk = require('chalk')
const connectToToDB = require('../config/mongo')
const { Country } = require('../models/index')

dotenv.config()
;(async () => {
  let mongoose = null
  try {
    mongoose = await connectToToDB()
  } catch (e) {
    throw new Error(`Mongo error:${e.message}`)
  }

  try {
    await Country.deleteMany()
    console.log(chalk.underline.bold.blue('Countries have been deleted!'))
    await mongoose.connection.close()
  } catch (e) {
    console.log(chalk.red.bold.underline(e.message))
  }
})()
