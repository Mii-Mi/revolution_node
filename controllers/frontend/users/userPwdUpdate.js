const Users = require('../../../models/User'),
      bcrypt = require('bcrypt')

module.exports = (req, res) => {
    const usr = Users.findById(req.params.usrId)

    if (req.params.usrTstamp === usr.lastVisit && req.body.pass === req.body.pass2){

        console.log(req.body.pass);
        
        bcrypt.hash(req.body.pass, 10, (error, hash) => {
            if(error){
                console.log(error);
            }
            req.body.pass = hash
            console.log(req.body.pass);

            Users.findByIdAndUpdate(req.params.usrId, { 'pass': req.body.pass}, (err, upUser) => {
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