const Users = require('../../../models/User')

module.exports = (req, res) => {

    Users.find({ userGroup: 3 }, (error, banned) => {

        if (error) {
            console.log(error);
        }

        if (res.locals.admin === true || res.locals.modo === true) {

            res.render('backendView/members/banList', { layout: 'admin.hbs', banned })
        } else {
            req.flash('error', 'Vous devez être administrateur pour voir cette page !')
        }
    })

}