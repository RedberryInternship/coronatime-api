import express from "express"
import {swagger} from './middlewares/index.js'
import apiRouter from './routes/api.js'

const server = express();

server.use('/api', apiRouter);
server.use('/', swagger());

server.listen(4000, () => console.log(`I'm running on http://localhost:4000`));
