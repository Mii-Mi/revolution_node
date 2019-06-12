const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (error){
            console.log(error);
        }
        
        if(user){
            res.locals.uName = user.userName;
            
            if (user.userGroup === 0) {
                res.locals.admin = true
            } else if (user.userGroup === 1) {
                res.locals.member = true
            }else if (user.userGroup === 2){
                res.locals.modo = true
            }else{
                console.log('no userGroup');
            }
        }
        next()
    })
}