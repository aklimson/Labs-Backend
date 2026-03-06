import express from 'express'
import logger from 'morgan'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

app.use(logger('dev', {
  immediate: true,
  skip: () => process.env.NODE_ENV === 'test'
}))

app.use(express.json())
app.use('/', router)

app.use(errorHandler.notFoundDefault)
app.use(errorHandler.errorDefault)

export default app