const prisma = require('../prismaClient'); 

async function getCommentById(req, res) {
    const comment = await prisma.comments.findMany({
        where: { id: parseInt(req.params.id) }
      });
      res.json({ comment: comment })
}

async function createComment(req, res) {
    try { const comment = await prisma.comments.create({
        data: {
            post_id: req.body.post_id,
            name: req.body.name || "Anonymous",
            content: req.body.content
        }}
    );
    res.json(comment) 
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}

async function deleteComment(req, res) {
    try { const comment = await prisma.comments.delete({
        where: { id: parseInt(req.params.id) }
    })
    res.json(comment) 
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Comment not found' }); 
        }
        res.status(500).json({ error: error.message });
    }};

module.exports = {
    getCommentById,
    createComment,
    deleteComment
}