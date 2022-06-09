const express = require('express')
const dotenv = require('dotenv')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cors = require('cors')
const { swaggerMiddleware } = require('./middlewares/index')
const apiRouter = require('./routes/api')
const webRouter = require('./routes/web')
const connectToMongo = require('./config/mongo')

const server = express()
dotenv.config()
connectToMongo()

server.use(bodyParser.json())
server.use('/', webRouter)
server.use('/api', cors(), apiRouter)
server.use('/', swaggerMiddleware())

server.listen(process.env.SERVER_PORT, () =>
  console.log(chalk.whiteBright.bgBlue(`I'm running on http://localhost:4000`))
)
