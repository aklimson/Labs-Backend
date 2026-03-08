import TasksModel from '../model/tasksModel.js'

const toBool = (v) => v === 'on' || v === 'true' || v === '1' || v === 1

export const tasksPageController = {
  // GET /tasks
  async index(req, res, next) {
    try {
      const tasks = await TasksModel.getAll()
      res.render('tasks/index', { title: 'Tasks', tasks })
    } catch (error) {
      next(error)
    }
  },

  // GET /tasks/new
  newForm(req, res) {
    res.render('tasks/new', { title: 'New task' })
  },

  // POST /tasks
  async create(req, res, next) {
    try {
      const { title, description } = req.body

      if (!title) {
        req.session.flashMessage = { type: 'error', message: '❌ Title is required' }
        return res.redirect('/tasks/new')
      }

      await TasksModel.create({
        title,
        description: description ?? null,
        completed: 0
      })

      req.session.flashMessage = { type: 'success', message: '✅ Task created!' }
      res.redirect('/tasks')
    } catch (error) {
      next(error)
    }
  },

  // GET /tasks/:id
  async show(req, res, next) {
    try {
      const task = await TasksModel.getById(req.params.id)
      if (!task) return res.status(404).send('Task not found')
      res.render('tasks/show', { title: `Task #${task.id}`, task })
    } catch (error) {
      next(error)
    }
  },

  // GET /tasks/:id/edit
  async editForm(req, res, next) {
    try {
      const task = await TasksModel.getById(req.params.id)
      if (!task) return res.status(404).send('Task not found')
      res.render('tasks/edit', { title: `Edit task #${task.id}`, task })
    } catch (error) {
      next(error)
    }
  },

  // POST /tasks/:id
  async update(req, res, next) {
    try {
      const id = req.params.id
      const existingTask = await TasksModel.getById(id)
      if (!existingTask) return res.status(404).send('Task not found')

      const updatedTaskData = {
        title: req.body.title ?? existingTask.title,
        description: req.body.description ?? existingTask.description,
        completed: toBool(req.body.completed) ? 1 : 0
      }

      await TasksModel.update(id, updatedTaskData)

      req.session.flashMessage = { type: 'success', message: '✏️ Task updated!' }
      res.redirect(`/tasks/${id}`)
    } catch (error) {
      next(error)
    }
  },

  // POST /tasks/:id/delete
  async deleteTask(req, res, next) {
    try {
      const affectedRows = await TasksModel.delete(req.params.id)

      if (affectedRows === 0) {
        req.session.flashMessage = { type: 'error', message: '❌ Task not found' }
        return res.redirect('/tasks')
      }

      req.session.flashMessage = { type: 'success', message: '🗑️ Task deleted!' }
      res.redirect('/tasks')
    } catch (error) {
      next(error)
    }
  }
}