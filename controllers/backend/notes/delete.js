const Notes = require('../../../models/Notes')


module.exports = (req, res) => {

    Notes.findByIdAndRemove(
        req.params.noteId,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('Suppression réussie');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect('/admin/welcome');
            }
        });

    req.flash('success', 'Suppression réussie !');
    res.redirect('/admin/welcome');
}