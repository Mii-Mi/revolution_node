const Articles = require('../../../models/Articles')


module.exports = (req, res) => {

    const query = { _id: req.params.articleId };

    Articles.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        (error, article) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/article/edit/${req.params.articleId}`)
            } else {
                req.flash('success', 'Article modifié avec succès.')
                res.redirect('/articles/display')
            }
        }
    )
}