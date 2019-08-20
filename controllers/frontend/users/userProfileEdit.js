const Profile = require('../../../models/Profiles')

module.exports = (req, res) => {

    let title = 'Voir un profil - '

    Profile.findOne({userId: req.params.userId}, (error, profile) => {
        if (error){
            console.log(error);
        }
        res.render('frontendView/users/userProfileEdit', {profile, title})
    })
}