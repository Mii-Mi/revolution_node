const Users = require('../../../models/User')

module.exports = (req, res) => {

    console.log(req.params.userId);

    const query = { _id: req.params.userId };

    Users.findOneAndUpdate(
        query,
        {
            userGroup: 2
        },
        { useFindAndModify: false },
        (error, user) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
            } else {
                req.flash('success', `Félicitations ! ${user.userName} est désormais modérateur !`)
            }

            return res.redirect(`/userProfile/${req.params.userId}`)
        }
    )
}