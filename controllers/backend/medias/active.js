const Medias = require('../../../models/Medias')

module.exports = (req, res) => {
    const query = { _id: req.params.mediaId };

    Medias.findOneAndUpdate(
        query,
        {
            active: true,
        },
        (error, media) => {
            if (error) {
                req.flash('error', 'L\' activation a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/medias/list`)
            } else {
                req.flash('success', 'Media activé avec succès.')
                res.redirect('/galleryDisplay')
            }
        }
    )
}