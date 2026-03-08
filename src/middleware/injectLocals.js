const middleware = {}
export { middleware as localsMiddleware }

// base url used in layout (optional but handy)
middleware.injectBaseUrl = (req, res, next) => {
  res.locals.baseURL = process.env.BASE_URL || "/"
  next()
}

// flash messages stored in session (no extra lib needed)
middleware.flashMessage = (req, res, next) => {
  res.locals.flashMessage = req.session.flashMessage || null
  req.session.flashMessage = null
  next()
}