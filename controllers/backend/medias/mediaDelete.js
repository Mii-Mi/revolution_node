const Medias = require('../../../models/Medias'),
      fs = require('fs');


module.exports = async (req, res) => {

    const media = await Medias.findById(req.params.id)
    const imageToDelete = `public${media.image}`
    const query = media.id;
    // console.log(query);

    Medias.findByIdAndRemove(
        query,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('Suppression réussie');
            } else {
                req.flash('error', 'Échec de la suppression ...');
                res.redirect('/');
            }
        });

    fs.unlink(imageToDelete, function (err, result) {
        console.log(err);
    });

    req.flash('success', 'Suppression réussie !');
    res.redirect('/galleryDisplay');
}