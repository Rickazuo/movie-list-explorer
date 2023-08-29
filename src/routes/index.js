const { Router } = require("express")

const usersRouter = require("./users.routes.js")
const movieNotesRouter = require("./movieNotes.routes.js")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies", movieNotesRouter)

module.exports = routes;