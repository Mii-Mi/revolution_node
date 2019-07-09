const Users = require('../../../models/User'),
      bcrypt = require('bcrypt')

module.exports = (req, res) => {
    const usr = Users.findById(req.params.usrId)

    if (req.params.usrTstamp === usr.lastVisit && req.body.pass === req.body.pass2){

        const password = req.body.pass
        bcrypt.hash(password, 10, (hash) => {
            req.body.pass = hash

            Users.findByIdAndUpdate(usr._id, { 'pass': req.body.pass}, (err, upUser) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Une erreur est survenue... veuillez réessayer.')
                    res.redirect('/')
                }else{
                    req.flash('succes', 'Succès ! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe !')
                    res.redirect('/')
                }
            })
        })
    }
}