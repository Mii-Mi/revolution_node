const Editos = require('../../../models/Editos')


module.exports = (req, res) => {

    Editos.findByIdAndRemove(
        req.params.editoId,
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
    res.redirect('/');
}