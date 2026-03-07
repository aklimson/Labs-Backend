import express from 'express'
import { controller } from '../controller/taskController.js'

export const router = express.Router()

router.get('/tasks', controller.getTasks)
router.get('/tasks/:id', controller.getTaskById)
router.post('/tasks', controller.createTask)
router.patch('/tasks/:id', controller.updateTask)
router.put('/tasks/:id', controller.replaceTask)
router.delete('/tasks/:id', controller.deleteTask)
