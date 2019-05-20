const User = require('../../models/User'),
      bcrypt = require('bcrypt');

module.exports = (req, res) => {

    const { userName, pass } = req.body;
    User.findOne({ userName }, (error, user) => {
        if (user) {
            bcrypt.compare(pass, user.pass, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    req.flash('success', 'Connexion réussie !');
                    res.redirect('/')
                } else {
                    req.flash('error', 'Échec de la connexion (mdp). Veuillez essayer à nouveau ...');
                    res.redirect('/');
                }
            })
        } else {
            req.flash('error', 'Échec de la connexion. Veuillez essayer à nouveau ...');
            return res.redirect('/')
        }
    })
}