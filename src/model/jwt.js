import jsonwebtoken from 'jsonwebtoken'

const jwtModel = {}

jwtModel.createJwtToken = (username, role, email) => {
  const payload = {
    iss: 'Issuer id',
    sub: username,
    username,
    email,
    role,
    permissions: ['read', 'write']
  }

  const options = {
    expiresIn: '1h'
  }

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options)
}

jwtModel.verifyJwtToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET)
}

export default jwtModel