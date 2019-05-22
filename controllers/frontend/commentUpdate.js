const Comments = require('../../models/Comments')


module.exports = (req, res) => {

    const query = { _id: req.params.commentId };

    Comments.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        { useFindAndModify: false },
        (error, comment) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/comment/edit/${req.params.commentId}`)
            } else {
                req.flash('success', 'Article modifié avec succès.')
                res.redirect(`/article/${comment.articleId}#${comment._id}`)
            }
        }
    )
}