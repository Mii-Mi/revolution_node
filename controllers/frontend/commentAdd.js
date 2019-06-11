const Comments = require('../../models/Comments'),
      Articles = require('../../models/Articles'),
      Users = require('../../models/User')

module.exports = (req, res) => {

    Users.findById(req.session.userId, (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }

        Comments.create(
            {
                ...req.body,
                author: user.userName,
                authorId: user._id,
                articleId: req.params.articleId,
                tStamp: Date.now()
            },
            (error, comment) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création du commentaire');
                } else {
                    Articles.findByIdAndUpdate(comment.articleId, { tStamp: Date.now() }, (err, article) => {
                        if (err) {
                            console.log(err);
                        }
                        req.session[`read` + comment.articleId] = Date.now()
                    req.flash('success', 'Commentaire créé avec succes !');
                    })
                    res.redirect(`/article/${comment.articleId}#${comment._id}`)
                }
            }
        )
    })
}