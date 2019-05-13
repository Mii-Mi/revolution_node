// const User = require('../database/models/User');

module.exports = (req, res) => {
    delete req.session.userId;
    req.flash('success', 'Vous êtes maintenant déconnecté !');
    return res.redirect('/')
}