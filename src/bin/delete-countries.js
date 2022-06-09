import chalk from 'chalk'
import dotenv from 'dotenv'
import connectToToDB from '../config/mongo'
import { Country } from '../models/index.js'

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
