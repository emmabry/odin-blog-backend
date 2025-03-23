const { Router } = require("express");
const usersController = require("../controllers/usersController");
const { verifyToken } = require('../middleware/auth'); 

const usersRouter = Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", verifyToken, usersController.getUserById);
usersRouter.get("/:id/posts", usersController.getPostsByUser);
usersRouter.delete('/:id', verifyToken, usersController.deleteUser);
usersRouter.post("/", verifyToken, usersController.createUser);

module.exports = usersRouter;