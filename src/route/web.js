import express from "express"
import { fridayController } from "../controller/fridayController.js"
import { tasksPageController } from "../controller/tasksPageController.js"

export const webRouter = express.Router()

webRouter.get("/", (req, res) => res.render("index", { title: "Home" }))
webRouter.get("/friday", fridayController.show)

// Tasks pages
webRouter.get("/tasks", tasksPageController.index)
webRouter.get("/tasks/new", tasksPageController.newForm)
webRouter.post("/tasks", tasksPageController.create)

webRouter.get("/tasks/:id", tasksPageController.show)
webRouter.get("/tasks/:id/edit", tasksPageController.editForm)
webRouter.post("/tasks/:id", tasksPageController.update)
webRouter.post("/tasks/:id/delete", tasksPageController.deleteTask)