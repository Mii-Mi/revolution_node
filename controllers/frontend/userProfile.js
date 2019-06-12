const Users = require('../../models/User'),
      Profiles = require('../../models/Profiles'),
      Articles = require('../../models/Articles')

module.exports = (req, res) => {
     
    let userIsAdmin = false,
        userIsBanned = false
        isOwner = false

    Users.findById(req.params.userId, (error, usr) => {
        // console.log(req.flash('data')[0]);
        if(error) {
            console.log(error);
        }
        
        if (req.session.userId === req.params.userId){
            isOwner = true
        }

        if (usr.userGroup === 0){
            userIsAdmin = true
        }else if (usr.userGroup === 3){
            userIsBanned = true
        }

        Profiles.findOne({userId: usr._id}, async (error, profile) => {
            if(error) {
                console.log(error);
            }
            const article = await Articles.find({author: usr.userName})
        
            res.render('frontendView/userProfile', { usr, profile, isOwner, userIsAdmin, userIsBanned, article })
        })
    })
}