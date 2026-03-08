import express from 'express'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import logger from 'morgan'
import helmet from 'helmet'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import { localsMiddleware } from './middleware/injectLocals.js'

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

// Parse HTML form data (POST)
app.use(express.urlencoded({ extended: false }))

// Session middleware (required for flash messages)
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax'
    // secure: true, // enable when running HTTPS
  }
}))

// Middleware to inject into response.locals
app.use(localsMiddleware.injectBaseUrl)
app.use(localsMiddleware.flashMessage)

// EJS view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

// EJS layout setup (optional, but allowed)
app.use(expressLayouts)
app.set('layout', path.join('layouts', 'default'))

// Routes
app.use('/', router)

// Error handlers
app.use(errorHandler.notFoundDefault)
app.use(errorHandler.errorDefault)

export default app