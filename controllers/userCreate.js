const User = require('../models/User');

module.exports = (req, res) => {
    if(req.body.pass === req.body.pass2){
            User.create(
            req.body, (error, user) => {

                if (error) {

                    const warn = (Object.keys(error.errors).map(key => error.errors[key].message));

                    req.flash('error', warn);
                    req.flash('data', req.body)

                    return res.redirect('/');
                    
                }

                req.flash('success', 'Enregistrement réussi, vous pouvez maintenant vous connecter !');
                res.redirect('/');
            }
        )
    }

}
