const User = require('../models/User');

module.exports = (req, res, next) => {

    if (res.locals.admin || res.locals.modo) {
        next()
    } else {
        console.log(error);
        req.flash('error', 'Vous devez être modérateur pour effectuer cette opération.')
        return res.redirect('/')
    }
}