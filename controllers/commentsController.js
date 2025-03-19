const prisma = require('../prismaClient'); 

async function getCommentById(req, res) {
    const comment = await prisma.comments.findMany({
        where: { id: parseInt(req.params.id) }
      });
      res.json({ comment: comment })
}

module.exports = {
    getCommentById
}