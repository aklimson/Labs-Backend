import http from 'http'

export const errorHandler = {}

/**
 * Default handler for 404 routes when the resource is not found.
 */
errorHandler.notFoundDefault = (req, res, next) => {
  const err = new Error(http.STATUS_CODES[404] || 'Not Found')
  err.status = 404
  next(err)
}

/**
 * Global error handler.
 */
errorHandler.errorDefault = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack)
  }

  const statusCode = err.status || 500
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message

  res.status(statusCode).json({
    status: statusCode,
    message
  })
}
