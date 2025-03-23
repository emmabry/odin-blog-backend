const { Router } = require("express");
const commentsController = require("../controllers/commentsController");
const { verifyToken } = require('../middleware/auth'); 
const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentById)
commentsRouter.post("/", commentsController.createComment)
commentsRouter.delete('/:id', verifyToken, commentsController.deleteComment)

module.exports = commentsRouter;