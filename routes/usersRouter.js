const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.get("/:id/comments", usersController.getCommentsByUser);
usersRouter.get("/:id/posts", usersController.getPostsByUser);
usersRouter.delete('/:id', usersController.deleteUser)
usersRouter.post("/", usersController.createUser)

module.exports = usersRouter;