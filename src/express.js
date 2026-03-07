import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

// Security middleware
app.use(helmet())
app.disable('x-powered-by')

// Logger
app.use(logger('dev', {
  immediate: true,
  skip: () => process.env.NODE_ENV === 'test'
}))

// Serve static files
app.use(express.static('public'))

// Parse JSON
app.use(express.json())

// Routes
app.use('/', router)

// Error handlers
app.use(errorHandler.notFoundDefault)
app.use(errorHandler.errorDefault)

export default app