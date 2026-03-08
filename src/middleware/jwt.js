import jwt from '../model/jwt.js'

const middleware = {}

middleware.jwtTokenIsValid = (req, res, next) => {
  const authHeader = req.header('Authorization') || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader

  try {
    if (!token) {
      const err = new Error('JWT token is not valid.')
      err.status = 403
      throw err
    }

    res.locals.jwt = jwt.verifyJwtToken(token)
    next()
  } catch (error) {
    error.status = 403
    next(error)
  }
}

export default middleware