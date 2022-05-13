import express from 'express';
import { swagger } from './middlewares/index.js';
import apiRouter from './routes/api.js';
import dotenv from 'dotenv';
import connectToMongo from './config/mongo.js';
import registerCronJobs from './config/cron.js';
import chalk from 'chalk';

const server = express();

dotenv.config();

connectToMongo();
registerCronJobs();

server.use('/api', apiRouter);
server.use('/', swagger());

server.listen(process.env.SERVER_PORT, () =>
  console.log(chalk.whiteBright.bgBlue(`I'm running on http://localhost:4000`))
);
