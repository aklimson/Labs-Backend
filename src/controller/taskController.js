import TasksModel from '../model/TasksModel.js';

export const controller = {
    // GET /tasks
    // Get all tasks from the database
    async getTasks(req, res, next) {
        try {
            const tasks = await TasksModel.getAll();
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    },

    // GET /tasks/:id
    // Get one task by id
    async getTaskById(req, res, next) {
        try {
            const task = await TasksModel.getById(req.params.id);

            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.json(task);
        } catch (error) {
            next(error);
        }
    },

    // POST /tasks
    // Create a new task in the database
    async createTask(req, res, next) {
        try {
            const { title, description, completed } = req.body;

            // Check that title exists
            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const newTask = await TasksModel.create({
                title,
                description,
                completed
            });

            res.status(201).json(newTask);
        } catch (error) {
            next(error);
        }
    },

    // PATCH /tasks/:id
    // Update part of a task
    async updateTask(req, res, next) {
        try {
            // First get the existing task from the database
            const existingTask = await TasksModel.getById(req.params.id);

            if (!existingTask) {
                return res.status(404).json({ error: 'Task not found' });
            }

            // For PATCH, keep old values if new ones are not sent
            const updatedTaskData = {
                title: req.body.title ?? existingTask.title,
                description: req.body.description ?? existingTask.description,
                completed: req.body.completed ?? existingTask.completed
            };

            const affectedRows = await TasksModel.update(req.params.id, updatedTaskData);

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            const updatedTask = await TasksModel.getById(req.params.id);
            res.json(updatedTask);
        } catch (error) {
            next(error);
        }
    },

    // PUT /tasks/:id
    // Replace the whole task
    async replaceTask(req, res, next) {
        try {
            const { title, description, completed } = req.body;

            // For PUT, require title
            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const affectedRows = await TasksModel.update(req.params.id, {
                title,
                description: description ?? null,
                completed: completed ?? false
            });

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            const updatedTask = await TasksModel.getById(req.params.id);
            res.json(updatedTask);
        } catch (error) {
            next(error);
        }
    },

    // DELETE /tasks/:id
    // Delete a task by id
    async deleteTask(req, res, next) {
        try {
            const affectedRows = await TasksModel.delete(req.params.id);

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
};