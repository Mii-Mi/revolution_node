const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (error){
            console.log(error);
        }
        
        if(user){
            res.locals.uName = user.userName;

            switch (user.userGroup) {
                case 0:
                    res.locals.admin = true
                    break;
                case 1:
                    res.locals.member = true
                    break;
                case 2:
                    res.locals.modo = true
                    break;
                case 3:
                    res.locals.banned = true
                    break;
            
                default:
                    console.log('Error: no userGroup')
                    break;
            }
        }
        next()
    })
}