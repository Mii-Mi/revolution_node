const User = require('../../../models/User'),
      Profile = require('../../../models/Profiles')

module.exports = (req, res) => {
    if(req.body.pass === req.body.pass2){
        req.body.userGroup = 1;
        User.create(
            req.body, (error, user) => {

                if (error) {

                    const warn = (Object.keys(error.errors).map(key => error.errors[key].message));

                    console.log(warn);
                    

                    return res.redirect('/');
                    
                }
                
                Profile.create(
                    { userId: user._id }, (error, profile) => {
                        if (error) {
                            console.log(user._id);

                            const warn2 = (Object.keys(error.errors).map(key => error.errors[key].message));

                            console.log(warn2);
                            

                            return res.redirect('/');

                        }
                        req.flash('success', 'Enregistrement réussi, vous pouvez maintenant vous connecter !');
                        res.redirect('/');
                    }
                )

            }
        )
    }

}
