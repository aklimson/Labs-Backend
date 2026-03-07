const apiKeys = [
  {
    description: 'Master key with unlimited usage',
    key: '8040462fc9c65d3ad045eec6bf994e8d',
    rate: null,
    usage: 0
  },
  {
    description: 'Trial key with limited usage',
    key: '21bc55a1a71abe81d1f141e80a745587',
    rate: 3,
    usage: 0
  }
]

export const verifyApikey = (req, res, next) => {
  const aKey =
    req.query.API_KEY ||
    req.header('Authorization') ||
    (req.body && req.body.authorization) ||
    null

  const validKey = apiKeys.find(k => k.key === aKey)

  if (!validKey) {
    return res.status(403).json({
      type: 'forbidden',
      message: 'You have not supplied a valid API key!'
    })
  }

  next()
}