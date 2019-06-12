const Mp = require('../../models/Mp'),
      MpResp = require('../../models/MpResp')

module.exports = (req, res) => {


    MpResp.deleteMany({ mpId: req.params.mpId }, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('réponses supprimés');
    })

    Mp.findByIdAndRemove(
        req.params.mpId,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('Suppression article réussie');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect('/');
            }
        });


    req.flash('success', 'Suppression réussie !');
    res.redirect('/');
}