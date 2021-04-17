import './helpers/dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import logger from './helpers/logger'
// you have to parse it and then the second param is the base
// we use base ten
import router from './routes'
import { notFound, errorHandler } from './helpers/errors'

const port = parseInt(process.env.PORT, 10) || 3000

const app = express()

// the middle ware goes before every request to the server
app.use(morgan(process.env.MORGAN_LOG))

app.use(cors({ origin: process.env.origin }))

app.use(helmet())

app.use(router)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  logger.success(`application started at http://localhost:${process.env.PORT}`),
)
