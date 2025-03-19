const prisma = require('../prismaClient'); 

async function getAllPosts(req, res) {
    const posts = await prisma.posts.findMany()
    res.json({ posts: posts })
}

async function getPostById(req, res) {
    const post = await prisma.posts.findUnique({
        where: { id: parseInt(req.params.id) }
    });
    res.json({ post: post })
}

async function getPostComments(req, res) {
    const comments = await prisma.comments.findMany({
        where: { post_id: parseInt(req.params.id) }
     });
    res.json({ comments: comments })
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostComments
  };