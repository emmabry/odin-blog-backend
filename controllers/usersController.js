const prisma = require('../prismaClient'); 

async function getAllUsers(req, res) {
    const users = await prisma.users.findMany();
    res.json({ users: users })
}

async function getUserById(req, res) {
    const user = await prisma.users.findMany({
        where: { id: parseInt(req.params.id) }
    });
    res.json({ user: user })
}

async function getCommentsByUser(req, res) {
    const comments = await prisma.comments.findMany({
        where: { user_id: parseInt(req.params.id) }
    });
    res.json({ comments: comments })
}

async function getPostsByUser(req, res) {
    const posts = await prisma.posts.findMany({
        where: { user_id: parseInt(req.params.id) }
    });
    res.json({ posts: posts })
}

module.exports = {
    getAllUsers,
    getUserById,
    getCommentsByUser,
    getPostsByUser
}