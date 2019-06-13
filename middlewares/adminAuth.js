const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (user && user.userGroup == 0 && !error) {
            next()
        }else{
            console.log(error);
            req.flash('error', 'Vous devez être administrateur pour effectuer cette opération.')
            return res.redirect('/')
            }
    })
}