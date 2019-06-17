Users = require('../../../models/User')

module.exports = (req, res) => {

    Users.findById(req.params.userId, (err, banned) => {
        if (err){
            console.log(err);
        }
        res.render('backendView/members/banForm', {layout: 'admin.hbs', banned})
    })
}