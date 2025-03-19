const { Router } = require("express");
const postsController = require("../controllers/postsController");
const postsRouter = Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getPostById)
postsRouter.get('/:id/comments', postsController.getPostComments)

module.exports = postsRouter;