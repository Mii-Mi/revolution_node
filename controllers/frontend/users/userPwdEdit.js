Users = require('../../../models/User')

module.exports = (req, res) => {
    Users.findById(req.params.usrId, (err, usr) => {
        if (err){
            console.log(err);
        }else{
            console.log(usr._id);
            
            res.render('frontendView/users/pwdEdit', {usr})
        }
    })
}