const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (error){
            console.log(error);
        }
        
        if(user){
            if (user.userGroup == 0) {
                req.flash('data', 'admin')
            } else if (user.userGroup == 1) {
                req.flash('data', 'member')
            }else{
                req.flash('data', '')
            }
        }
        next()
    })
}