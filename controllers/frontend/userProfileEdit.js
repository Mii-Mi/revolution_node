const Profile = require('../../models/Profiles')

module.exports = (req, res) => {

    Profile.findOne({userId: req.params.userId}, (error, profile) => {
        if (error){
            console.log(error);
        }
        res.render('frontendView/userProfileEdit', {profile})
    })

}