const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { verifyToken } = require('../middleware/auth'); 
const postsRouter = Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getPostById)
postsRouter.get('/:id/comments', postsController.getPostComments)
postsRouter.post('/', verifyToken, postsController.createPost)
postsRouter.delete('/:id', verifyToken, postsController.deletePost)

module.exports = postsRouter;