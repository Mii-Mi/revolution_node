const Users = require('../../models/User'),
      Articles = require('../../models/Articles')

module.exports = (req, res) => {
    let group = req.flash('data')[0],
        userIsAdmin = false,
        isOwner = false

    Users.findById(req.params.userId, async (error, usr) => {
        // console.log(req.flash('data')[0]);
        if(error) {
            console.log(error);
        }
        
        if (req.session.userId === req.params.userId){
            isOwner = true
        }

        if (usr.userGroup == 0){
            userIsAdmin = true
        }

        
        const article = await Articles.find({author: usr.userName})
        
        if (group === 'admin') {
            const admin = true
            res.render('frontendView/userProfile', { usr, isOwner, admin, userIsAdmin, article })
        } else if (group === 'member') {
            const member = true
            res.render('frontendView/userProfile', { usr, isOwner, member, userIsAdmin, article })
        } else {
            console.log(group);
            res.render('index');
        }
    })
}