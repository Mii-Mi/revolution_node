const Articles = require('../../models/Articles')


module.exports = (req, res) => {

    Articles.findByIdAndRemove(
        req.params.articleId,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('Suppression réussie');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect('/');
            }
        });

    req.flash('success', 'Suppression réussie !');
    res.redirect('/articles/display');
}