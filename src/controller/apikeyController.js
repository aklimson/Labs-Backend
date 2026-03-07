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

const controller = {}

/**
 * List all API keys
 */
controller.listKeys = (req, res) => {
  res.json(apiKeys)
}

/**
 * Verify API key supplied through query string
 */
controller.verifyQueryString = (req, res) => {
  const aKey = req.query.API_KEY || null

  const validKey = apiKeys.find(k => k.key === aKey)

  if (!validKey) {
    return res.status(403).json({
      type: 'forbidden',
      message: 'You have not supplied a valid API key!'
    })
  }

  res.json({
    message: 'YES. You supplied a valid key through the query string!'
  })
}

controller.verifyHeader = (req, res) => {
  const aKey = req.header('Authorization') || null

  const validKey = apiKeys.find(k => k.key === aKey)

  if (!validKey) {
    return res.status(403).json({
      type: 'forbidden',
      message: 'You have not supplied a valid API key!'
    })
  }

  res.json({
    message: 'YES. You supplied a valid key through the header!'
  })
}

controller.verifyBody = (req, res) => {
  const aKey = req.body.authorization || null

  const validKey = apiKeys.find(k => k.key === aKey)

  if (!validKey) {
    return res.status(403).json({
      type: 'forbidden',
      message: 'You have not supplied a valid API key!'
    })
  }

  res.json({
    message: 'YES. You supplied a valid key through the body!'
  })
}

controller.magicAnswer = (req, res) => {
  res.json({
    message: 'YES. The magic answer is 42!'
  })
}

export default controller