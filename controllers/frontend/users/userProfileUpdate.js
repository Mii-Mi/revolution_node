const Profiles = require('../../../models/Profiles')

module.exports = (req, res) => {

    const query = { _id: req.params.profileId };

    Profiles.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        (error, profile) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/profile/edit/${req.body.id}`)
            } else {
                req.flash('success', 'Profil modifié avec succès.')
                res.redirect(`/userProfile/${profile.userId}`)
            }
        }
    )
}