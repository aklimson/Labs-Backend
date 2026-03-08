import usersModel from '../model/jwtUsersModel.js'

const controller = {}

controller.init = async (req, res, next) => {
  try {
    const result = await usersModel.initPasswords()

    res.status(200).json({
      type: 'success',
      message: 'Passwords initialized with bcrypt.',
      updated: result.updated
    })
  } catch (error) {
    next(error)
  }
}

controller.list = async (req, res, next) => {
  try {
    const users = await usersModel.getAllUsers()

    res.status(200).json({
      type: 'success',
      users
    })
  } catch (error) {
    next(error)
  }
}

controller.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({
        type: 'failed',
        message: 'username, password and email are required.'
      })
    }

    const user = await usersModel.register(username, password, email)

    res.status(200).json({
      type: 'success',
      message: 'The user was registered.',
      user
    })
  } catch (error) {
    next(error)
  }
}

controller.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        type: 'failed',
        message: 'username and password are required.'
      })
    }

    const result = await usersModel.login(username, password)

    res.status(200).json({
      type: 'success',
      message: 'The user was authenticated.',
      payload: result.payload,
      token: result.token
    })
  } catch (error) {
    next(error)
  }
}

controller.token = async (req, res, next) => {
  try {
    res.status(200).json({
      type: 'success',
      message: 'The JWT token was validated.',
      payload: res.locals.jwt
    })
  } catch (error) {
    next(error)
  }
}

export default controller