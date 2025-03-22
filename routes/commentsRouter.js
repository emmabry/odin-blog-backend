const { Router } = require("express");
const commentsController = require("../controllers/commentsController");
const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentById)
commentsRouter.post("/", commentsController.createComment)
commentsRouter.delete('/:id', commentsController.deleteComment)

module.exports = commentsRouter;