const Users = require('../../../models/User')

module.exports = (req, res) => {
    Users.findByIdAndUpdate(
        req.params.userId,
        { userGroup: 3,
          banCause: req.body.content},
        (error, member) => {
            if (error) {
                req.flash('error', 'La mise au ban a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/userProfile/${req.params.userId}`)
            } else {
                req.flash('success', `${member.userName} a bien été banni !`)
                res.redirect(`/userProfile/${req.params.userId}`)
            }
        }
    )
}