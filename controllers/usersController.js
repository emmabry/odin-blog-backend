const prisma = require('../prismaClient'); 
const bcrypt = require('bcryptjs')

async function getAllUsers(req, res) {
    const users = await prisma.users.findMany();
    res.json({ users: users })
}

async function getUserById(req, res) {
    const user = await prisma.users.findUnique({
        where: { id: parseInt(req.params.id) }
    });
    res.json({ user: user })
}

async function getPostsByUser(req, res) {
    const posts = await prisma.posts.findMany({
        where: { user_id: parseInt(req.params.id) }
    });
    res.json({ posts: posts })
}

async function deleteUser(req, res) {
    try { const user = await prisma.user.delete({
        where: { id: parseInt(req.params.id) }
    })
    res.json(user) 
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(500).json({ error: 'Failed to delete user' });
    }};

async function createUser(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try { const user = await prisma.users.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }}
    );
    res.json(user) 
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getPostsByUser,
    deleteUser,
    createUser
}