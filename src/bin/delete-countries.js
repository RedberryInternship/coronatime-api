import chalk from 'chalk';
import connectToToDB from '../config/mongo.js';
import { Country } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  let mongoose = null;
  try {
    mongoose = await connectToToDB();
  } catch (e) {
    throw new Error('Mongo error:' + e.message);
  }

  try {
    await Country.deleteMany();
    console.log(chalk.underline.bold.blue('Countries have been deleted!'));
    await mongoose.connection.close();
  } catch (e) {
    console.log(chalk.red.bold.underline(e.message));
  }
})();
