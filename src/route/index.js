import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as tasksRoute } from './tasks.js'
import { router as usersRoute } from './usersRoute.js'

export const router = express.Router()

router.use('/', helloRoute)
router.use('/api/v1', tasksRoute)
router.use('/', usersRoute)
