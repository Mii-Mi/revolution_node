const Users = require('../../../models/User')

module.exports = (req, res) => {
    
    Users.find({userGroup: 0}, (error, admins) => {
        
        if (error){
            console.log(error);
        }

        Users.find({ userGroup: 1 }, (error, members) => {

            if (error) {
                console.log(error);
            }

            Users.find({ userGroup: 3 }, (error, banned) => {

                Users.find({ userGroup: 2 }, (error, modos) => {

                    if (error) {
                        console.log(error);
                    }

                    if (res.locals.admin === true || res.locals.modo === true) {
                        
                        res.render('backendView/members/display_list', { admins, modos, members, banned })
                    } else {
                        req.flash('error', 'Vous devez être administrateur pour voir cette page !')
                    }
                })
            })
        })
    })
}