const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (error){
            console.log(error);
        }
        
        if(user){
            res.locals.uName = user.userName;
            
            if (user.userGroup === 0) {
                req.flash('data', 'admin')
            } else if (user.userGroup === 1) {
                req.flash('data', 'member')
            }else if (user.userGroup === 3){
                delete req.session.userId
                req.flash('error', 'Il semblerait que vous soyez banni, Veuillez contacter un administrateur !')
                return res.redirect('/')
            }else{
                req.flash('data', '')
            }
        }
        next()
    })
}