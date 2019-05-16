const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if(user){
            if (user.userGroup == 0){
                const group = 'admin'
                res.locals.userGroup = group
            } else if (user.userGroup == 1){
                const group = member
                res.locals.userGroup = group
            }
            
            // if (user.userGroup == 0) {
            //     req.flash('data', 'admin')
            //     res.locals.userGroup = user.userGroup
            // } else if (user.userGroup == 1) {
            //     req.flash('data', 'member')
            // }
        }
        next()
    })
}