const Users = require('../../models/User'),
      Profiles = require('../../models/Profiles'),
      Articles = require('../../models/Articles')

module.exports = (req, res) => {
     
    let userIsAdmin = false,
        userIsBanned = false,
        userIsModo = false,
        userIsMember = false,
        isOwner = false

    Users.findById(req.params.userId, (error, usr) => {
        // console.log(req.flash('data')[0]);
        if(error) {
            console.log(error);

        }
        
        if (req.session.userId === req.params.userId){
            isOwner = true
        }
        if(usr){
            if (usr.userGroup === 0){
            userIsAdmin = true
            }else if (usr.userGroup === 1){
                userIsMember = true
            }else if (usr.userGroup === 2){
                userIsModo = true
            }else if (usr.userGroup === 3){
                userIsBanned = true
            }
        }else{
            req.flash('error', 'Aucun utilisateur trouvé')
            return res.redirect('/')
        }

            Profiles.findOne({userId: usr._id}, async (error, profile) => {
                if(error) {
                    console.log(error);
                }
                const article = await Articles.find({authorId: usr._id})
            
                res.render('frontendView/userProfile', { usr, profile, isOwner, userIsAdmin, userIsModo, userIsMember, userIsBanned, article })
            })
    })
}