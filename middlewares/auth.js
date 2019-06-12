const User = require('../models/User')

module.exports = (req, res, next) => {

    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            req.flash('error', 'Vous devez être connecté pour effectuer cette opération.')
            return res.redirect('/')
        }

        next()
    })
}