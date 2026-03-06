import express from 'express'
import logger from 'morgan'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

// Use the morgan logger
app.use(logger('dev', { 
  immediate: true,
  skip: () => process.env.NODE_ENV === 'test' 
}));

app.use('/', router)

// 404 handler
app.use(errorHandler.notFoundDefault)

// global error handler
app.use(errorHandler.errorDefault)
