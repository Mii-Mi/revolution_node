const Medias = require('../../../models/Medias')

module.exports = (req, res) => {
    const query = { _id: req.params.mediaId };

    Medias.findOneAndUpdate(
        query,
        {
            active: false,
        },
        (error, media) => {
            if (error) {
                req.flash('error', 'La desactivation a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/medias/list`)
            } else {
                req.flash('success', 'Media désactivé avec succès.')
                res.redirect('/galleryDisplay')
            }
        }
    )
}