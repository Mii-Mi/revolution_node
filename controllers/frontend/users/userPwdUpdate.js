const Users = require('../../../models/User')

module.exports = (req, res) => {
    const usr = Users.findById(req.params.usrId)

    if (req.params.usrTstamp === usr.lastVisit && req.body.pass === req.body.pass2){
        usr.update({'pass': req.body.pass}, (err, pass) => {
            if (err) {
                console.log(err);
                req.flash('error', 'Une erreur est survenue... veuillez réessayer.')
                res.redirect('/')
            }else{
                req.flash('succes', 'Succès ! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe !')
                res.redirect('/')
            }
        })
    }
}