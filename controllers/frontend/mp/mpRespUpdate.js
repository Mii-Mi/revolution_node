const MpResp = require('../../../models/MpResp')


module.exports = (req, res) => {

    const query = { _id: req.params.mpRespId };

    MpResp.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        { useFindAndModify: false },
        (error, mpResp) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/mp/response/edit/${req.params.mpRespId}`)
            } else {
                req.flash('success', 'Réponse modifiée avec succès.')
                res.redirect(`/mp/single/${mpResp.mpId}#${mpResp._id}`)
            }
        }
    )
}