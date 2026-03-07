import express from 'express'
import controller from '../controller/apikeyController.js'
import { verifyApikey } from '../middleware/verifyApikey.js'

export const router = express.Router()

router.get('/list', (req, res, next) =>
  controller.listKeys(req, res, next)
)

router.get('/try1', (req, res, next) =>
  controller.verifyQueryString(req, res, next)
)

router.post('/try2', (req, res, next) =>
  controller.verifyHeader(req, res, next)
)

router.post('/try3', (req, res, next) =>
  controller.verifyBody(req, res, next)
)

router.post('/try4', (req, res, next) =>
  controller.magicAnswer(req, res, next)
)

router.get('/try5', verifyApikey, controller.magicAnswer)
router.post('/try5', verifyApikey, controller.magicAnswer)