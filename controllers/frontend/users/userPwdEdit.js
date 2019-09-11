Users = require('../../../models/User')

module.exports = async (req, res) => {
    await Users.findById(req.params.usrId, (err, usr) => {
        if (err){

            console.log(err);

        } else if (req.params.usrTstamp !== usr.tStamp) {
            console.log(req.params.usrTstamp);
            console.log((usr.tStamp));
            
            req.flash('error', 'Le lien de réinitialisation n\'est pas valide !')
            return res.redirect('/')

        } else {
            let title = `Modifier le mot de passe de ${usr.userName}`
            console.log(usr._id);
            
            res.render('frontendView/users/pwdEdit', {usr, title})
        }
    })
}