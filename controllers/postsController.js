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

async function createPost(req, res) {
    try { const post = await prisma.posts.create({
        data: {
            user_id: Number(req.body.user_id),
            title: req.body.title,
            content: req.body.content
        }}
    );
    res.json(post) 
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}

async function deletePost(req, res) {
    try { const post = await prisma.posts.delete({
        where: { id: parseInt(req.params.id) }
    })
    res.json(post) 
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Post not found' }); 
        }
        res.status(500).json({ error: error.message });
    }};

module.exports = {
    getAllPosts,
    getPostById,
    getPostComments,
    createPost,
    deletePost
  };