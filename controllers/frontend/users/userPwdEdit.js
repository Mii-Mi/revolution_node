Users = require('../../../models/User')

module.exports = (req, res) => {
    Users.findById(req.params.userId, (err, usr) => {
        if (err){
            console.log(err);
        }else{
            res.render('frontendView/users/pwdEdit', {usr})
        }
    })
}