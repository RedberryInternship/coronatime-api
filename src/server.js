import express from 'express';
import { swaggerMiddleware } from './middlewares/index.js';
import apiRouter from './routes/api.js';
import webRouter from './routes/web.js';
import dotenv from 'dotenv';
import connectToMongo from './config/mongo.js';
import chalk from 'chalk';
import bodyParser from 'body-parser';

const server = express();
dotenv.config();
connectToMongo();

server.use(bodyParser.json());
server.use('/', webRouter);
server.use('/api', apiRouter);
server.use('/', swaggerMiddleware());

server.listen(process.env.SERVER_PORT, () =>
  console.log(chalk.whiteBright.bgBlue(`I'm running on http://localhost:4000`))
);
