const { Router } = require("express");

const usersRouter = require("./users.routes");
const movieNotesRouter = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movieNotes", movieNotesRouter);
routes.use("/movie_tags", movieTagsRoutes);

module.exports = routes;