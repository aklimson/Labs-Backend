import express from 'express'
import controller from '../controller/jwtController.js'
import jwtMiddleware from '../middleware/jwt.js'

const router = express.Router()

router.post('/init', controller.init)
router.get('/list', controller.list)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/token', jwtMiddleware.jwtTokenIsValid, controller.token)

export { router }