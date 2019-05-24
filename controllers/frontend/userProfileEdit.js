const Profile = require('../../models/Profiles')

module.exports = (req, res) => {

    const profile = Profile.findOne({userId: req.params.userId})
    res.render('frontendView/userProfileEdit', {profile})

}