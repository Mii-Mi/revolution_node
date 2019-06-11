const Comments = require('../../models/Comments')

module.exports = (req, res) => {

    Comments.findByIdAndRemove(
        req.params.commentId,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('delete ok');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect(`/article/${req.params.articleId}`);
            }
        });

    req.flash('success', 'Suppression réussie !');
    res.redirect(`/article/${req.params.articleId}`);
}