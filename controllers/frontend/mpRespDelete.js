const mpResp = require('../../models/MpResp')


module.exports = (req, res) => {

    mpResp.findByIdAndRemove(
        req.params.mpRespId,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('delete ok');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect(`/mp/single/${req.params.mpId}`);
            }
        });

    req.flash('success', 'Suppression réussie !');
    res.redirect(`/mp/single/${req.params.mpId}`);
}