const Comments = require('../../../models/Comments');

module.exports = async (req, res) => {
    let title = 'Modifier commentaire - '
    const comment = await Comments.findById(req.params.commentId);
    
    res.render('frontendView/articles/comments/edit', { comment, title })
}