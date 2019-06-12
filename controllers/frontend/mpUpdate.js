const Mp = require('../../models/Mp')

module.exports = (req, res) => {

    const query = { _id: req.params.mpId };

    Mp.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        (error, mp) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/mp/${req.params.mpId}`)
            } else {
                req.flash('success', 'Message modifié avec succès.')
                res.redirect(`/mp/single/${req.params.mpId}`)
            }
        }
    )
}